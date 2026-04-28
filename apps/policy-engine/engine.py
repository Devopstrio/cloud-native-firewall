import networkx as nx
import logging

class PolicyEngine:
    def __init__(self):
        self.logger = logging.getLogger("policy-engine")
        self.rules_graph = nx.DiGraph()

    def validate_rule_conflict(self, new_rule: dict, existing_rules: list):
        """
        Detects if a new rule conflicts with or is shadowed by existing rules.
        """
        # Simplified logic for demonstration
        for rule in existing_rules:
            if rule['src'] == new_rule['src'] and rule['dst'] == new_rule['dst'] and rule['port'] == new_rule['port']:
                if rule['action'] != new_rule['action']:
                    return True, f"Conflict: Overlapping rule with different action found (ID: {rule['id']})"
        return False, "No conflicts"

    def calculate_risk_score(self, rule: dict):
        """
        Assigns a risk score to a firewall rule based on its openness.
        """
        score = 0
        if rule['src'] == '0.0.0.0/0' or rule['src'] == '*':
            score += 50
        if rule['dst'] == '0.0.0.0/0' or rule['dst'] == '*':
            score += 50
        if rule['port'] == 'any' or rule['port'] == '*':
            score += 20
        
        return min(score, 100)

    def detect_drift(self, cloud_state: list, desired_state: list):
        """
        Identifies rules present in cloud but not in Git (drift).
        """
        drift = [rule for rule in cloud_state if rule not in desired_state]
        return drift

if __name__ == "__main__":
    engine = PolicyEngine()
    existing = [{"id": 1, "src": "10.0.0.0/24", "dst": "10.1.0.0/24", "port": "80", "action": "Allow"}]
    new_rule = {"src": "10.0.0.0/24", "dst": "10.1.0.0/24", "port": "80", "action": "Deny"}
    
    conflict, msg = engine.validate_rule_conflict(new_rule, existing)
    print(f"Conflict Test: {conflict} - {msg}")
    
    risk = engine.calculate_risk_score({"src": "*", "dst": "10.0.0.5", "port": "22"})
    print(f"Risk Score: {risk}/100")
