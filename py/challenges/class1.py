class Rectangle:
    def __init__(self, width, height):
        self._width = width
        self._height = height

    def get_width(self):
        return self._width

    def set_width(self, width):
        self._width = width

    def get_height(self):
        return self._height

    def set_height(self, height):
        self._height = height

    def area(self):
        return self._width * self._height


# Creating a rectangle object
rect = Rectangle(5, 3)

# Using getters to access attributes
print("Width:", rect.get_width())   # Output: Width: 5
print("Height:", rect.get_height()) # Output: Height: 3

# Using setters to modify attributes
rect.set_width(7)
rect.set_height(4)

# Calculating and printing the area
print("Area:", rect.area())         # Output: Area: 28
