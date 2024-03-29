def make(N):
    """
    :type N: int
    :rtype: list
    """
    solutions = []
    if N == 0: return [""]

    for case in make(N-1):
        sol = ["("+case+")",case+"()","()"+case]
        for new_case in sol:
            if not new_case in solutions:
                solutions.append(new_case)

    return solutions
