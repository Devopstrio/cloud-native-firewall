provider "azurerm" {
  features {}
}

provider "aws" {
  region = var.aws_region
}

resource "azurerm_resource_group" "rg" {
  name     = "rg-${var.project_name}-${var.environment}"
  location = var.location
}

# Azure Firewall (Centralized Hub Enforcement)
resource "azurerm_public_ip" "fw_ip" {
  name                = "pip-firewall-${var.environment}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  allocation_method   = "Static"
  sku                 = "Standard"
}

resource "azurerm_firewall" "fw" {
  name                = "fw-hub-${var.environment}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku_name            = "AZFW_VNet"
  sku_tier            = "Premium"

  ip_configuration {
    name                 = "configuration"
    subnet_id            = var.azure_firewall_subnet_id
    public_ip_address_id = azurerm_public_ip.fw_ip.id
  }
}

# AWS Network Firewall (Perimeter Protection)
resource "aws_networkfirewall_firewall" "fw" {
  name                = "fw-vpc-${var.environment}"
  firewall_policy_arn = aws_networkfirewall_firewall_policy.policy.arn
  vpc_id              = var.aws_vpc_id

  subnet_mapping {
    subnet_id = var.aws_firewall_subnet_id
  }
}

resource "aws_networkfirewall_firewall_policy" "policy" {
  name = "fw-policy-${var.environment}"

  firewall_policy {
    stateless_default_actions          = ["aws:forward_to_sfe"]
    stateless_fragment_default_actions = ["aws:forward_to_sfe"]
  }
}

# Kubernetes Cluster for Security Control Plane
resource "azurerm_kubernetes_cluster" "aks" {
  name                = "aks-security-control-${var.environment}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "secfirewall"

  default_node_pool {
    name       = "default"
    node_count = 3
    vm_size    = "Standard_DS3_v2"
  }

  identity {
    type = "SystemAssigned"
  }
}
