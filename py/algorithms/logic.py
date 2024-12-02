# the logic this goes with is :
# 1. let's make every operand a class of its own
# 2. let's make a sentence class
# 3. let's make a symbol class
# 4. let's do the model checking

# credit to CS50 AI for the idea

class Sentence:
    # this class has no init method
    # it's just a class for the subclasses to inherit from
    def evaluate(self, model):
        raise Exception("nothing to evaluate")
    
    def formula(self):
        return ""

    def symbols(self):
        return set()
    
    @classmethod
    def validate(cls, sentence):
        if not isinstance(sentence, Sentence):
            raise TypeError("must be a sentence")
    
    @classmethod
    def parenthesize(cls, s):
        def balanced(s):
            count = 0
            for c in s:
                if c == "(":
                    count += 1
                elif c == ")":
                    if count <= 0:
                        return False
                    count -= 1
            return count == 0
        
        if not len(s) or s.isalpha() or (s[0] == "(" and balanced(s[1:-1]) and s[-1] == ")"):
            return s
        else:
            return "(" + s + ")"

# every future class will inherit from this class ^

class Symbol(Sentence):
   
    def __init__(self, name):
        self.name = name

    def __eq__(self, other):
        return isinstance(other, Symbol) and self.name == other.name

    def __hash__(self):
        return hash(("symbol", self.name))

    def __repr__(self):
        return self.name

    def evaluate(self, model):
        try:
            return bool(model[self.name])
        except KeyError:
            raise Exception(f"variable {self.name} not in model {model}")

    def formula(self):
        return self.name

    def symbols(self):
        return {self.name}
    
"""
next up are the logical operators
"""
class Not(Sentence):
    def __init__(self, operand):
        Sentence.validate(operand)
        self.operand = operand

    def __eq__(self, other):
        return isinstance(other, Not) and self.operand == other.operand

    def __hash__(self):
        return hash(("not", hash(self.operand)))

    def __repr__(self):
        return f"Not({self.operand})"

    def evaluate(self, model):
        return not self.operand.evaluate(model)

    def formula(self):
        return "¬" + Sentence.parenthesize(self.operand.formula())

    def symbols(self):
        return self.operand.symbols()


class And(Sentence):
    def __init__(self, *conjuncts):
        for conjunct in conjuncts:
            Sentence.validate(conjunct)
        self.conjuncts = list(conjuncts)

    def __eq__(self, other):
        return isinstance(other, And) and self.conjuncts == other.conjuncts

    def __hash__(self):
        return hash(
            ("and", tuple(hash(conjunct) for conjunct in self.conjuncts))
        )

    def __repr__(self):
        conjunctions = ", ".join(
            [str(conjunct) for conjunct in self.conjuncts]
        )
        return f"And({conjunctions})"

    def add(self, conjunct):
        Sentence.validate(conjunct)
        self.conjuncts.append(conjunct)

    def evaluate(self, model):
        return all(conjunct.evaluate(model) for conjunct in self.conjuncts)

    def formula(self):
        if len(self.conjuncts) == 1:
            return self.conjuncts[0].formula()
        return " ∧ ".join([Sentence.parenthesize(conjunct.formula()) for conjunct in self.conjuncts])

    def symbols(self):
        return set.union(*[conjunct.symbols() for conjunct in self.conjuncts])


class Or(Sentence):
    def __init__(self, *disjuncts):
        for disjunct in disjuncts:
            Sentence.validate(disjunct)
        self.disjuncts = list(disjuncts)

    def __eq__(self, other):
        return isinstance(other, Or) and self.disjuncts == other.disjuncts

    def __hash__(self):
        return hash(
            ("or", tuple(hash(disjunct) for disjunct in self.disjuncts))
        )

    def __repr__(self):
        disjuncts = ", ".join([str(disjunct) for disjunct in self.disjuncts])
        return f"Or({disjuncts})"

    def evaluate(self, model):
        return any(disjunct.evaluate(model) for disjunct in self.disjuncts)

    def formula(self):
        if len(self.disjuncts) == 1:
            return self.disjuncts[0].formula()
        return " ∨ ".join([Sentence.parenthesize(disjunct.formula()) for disjunct in self.disjuncts])

    def symbols(self):
        return set.union(*[disjunct.symbols() for disjunct in self.disjuncts])

class Xor(Sentence):
    def __init__(self, *disjuncts):
        for disjunct in disjuncts:
            Sentence.validate(disjunct)
        self.disjuncts = list(disjuncts)
    
    def __eq__(self, other):
        return isinstance(other, Xor) and self.disjuncts == other.disjuncts
    
    def __hash__(self):
        return hash(("xor", tuple(hash(disjunct) for disjunct in self.disjuncts)))
    
    def __repr__(self):
        disjuncts = ", ".join([str(disjunct) for disjunct in self.disjuncts])
        return f"Xor({disjuncts})"
    
    def evaluate(self, model):
        return sum(disjunct.evaluate(model) for disjunct in self.disjuncts) % 2 == 1
    
    def formula(self):
        if len(self.disjuncts) == 1:
            return self.disjuncts[0].formula()
        return " ⊕ ".join([Sentence.parenthesize(disjunct.formula()) for disjunct in self.disjuncts])
    
    def symbols(self):
        return set.union(*[disjunct.symbols() for disjunct in self.disjuncts])

class Implication(Sentence):
    def __init__(self, antecedent, consequent):
        Sentence.validate(antecedent)
        Sentence.validate(consequent)
        self.antecedent = antecedent
        self.consequent = consequent

    def __eq__(self, other):
        return (isinstance(other, Implication)
                and self.antecedent == other.antecedent
                and self.consequent == other.consequent)

    def __hash__(self):
        return hash(("implies", hash(self.antecedent), hash(self.consequent)))

    def __repr__(self):
        return f"Implication({self.antecedent}, {self.consequent})"

    def evaluate(self, model):
        return ((not self.antecedent.evaluate(model)) or self.consequent.evaluate(model))

    def formula(self):
        antecedent = Sentence.parenthesize(self.antecedent.formula())
        consequent = Sentence.parenthesize(self.consequent.formula())
        return f"{antecedent} => {consequent}"

    def symbols(self):
        return set.union(self.antecedent.symbols(), self.consequent.symbols())


class Equival(Sentence):
    def __init__(self, left, right):
        Sentence.validate(left)
        Sentence.validate(right)
        self.left = left
        self.right = right

    def __eq__(self, other):
        return (isinstance(other, Equival)
                and self.left == other.left
                and self.right == other.right)

    def __hash__(self):
        return hash(("equival", hash(self.left), hash(self.right)))

    def __repr__(self):
        return f"equival({self.left}, {self.right})"

    def evaluate(self, model):
        return ((self.left.evaluate(model) and self.right.evaluate(model)) or (not self.left.evaluate(model) and not self.right.evaluate(model)))

    def formula(self):
        left = Sentence.parenthesize(str(self.left))
        right = Sentence.parenthesize(str(self.right))
        return f"{left} <=> {right}"

    def symbols(self):
        return set.union(self.left.symbols(), self.right.symbols())


def dict_union(d1, d2):
    """
    Returns the union of two dictionaries.
    """
    return {**d1, **d2}

# let's now try making the model checking

def model_check(knowledge, query):
    """ Checks if the KB entails query using model checking. """

    def all_models(symbols):
    # return  [all_models(diff(symbols,symb)) AND symb , all_models(diff(symbols,symb)) AND not symb]

        if not symbols:
            return [{}]
        
        symbol = symbols.pop()
        Rests = all_models(symbols)
        try:
            return [{symbol: False , **rest} for rest in Rests] + [{symbol: True, **rest} for rest in Rests]
        except:
            raise Exception(f"Error in all_models in model_check for symbols {symbols}")

    # Get set of all symbols
    symbols = set(knowledge.symbols()).union(query.symbols())

    # Check all possible models
    for model in all_models(symbols):
        try:
            # If KB is true in model and query is false, return False (KB does not entail query)
            if knowledge.evaluate(model) and not query.evaluate(model):

                # if you want to print the countermodel, uncomment the following line:
                # print(f"Model {model} is a countermodel for {knowledge} entails {query}")
                return False
        except:
            raise Exception(f"Error in model_check in model {model}")

    # If we didn't find a countermodel, query is entailed
    return True