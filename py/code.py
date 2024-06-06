# a oriented graph visualizer using matplotlib IN PYTHON
import matplotlib.pyplot as plt
import networkx as nx

def visualizer(Graph):
    # Graph : dictionary
    # Graph = {'graph' : {'a': ['b', 'c'], 'b': ['c'], 'c': ['d']},'directional': bool}
    if Graph["directional"] == True: G = nx.DiGraph()
    else: G = nx.Graph()
    graph = Graph["graph"]
    
    for node in graph:
        G.add_node(node)
        for neighbour in graph[node]:
            G.add_edge(node,neighbour)
    nx.draw(G, with_labels=True)
    plt.show()

visualizer({'graph': {'a': ['b', 'c'], 'b': ['c'], 'c': ['d']}, 'directional' : 1})
