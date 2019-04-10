import matplotlib.pyplot as plt

def getTable(infile):
    '''
    Return a 2D array of the data from the file passed in
    Parameter infile: The file to generate a table from
    Returns: A table representing the contents of the file
    '''

    file = open(infile, 'r')

    instances = []
    for line in file:
        line = line.strip() 
        values = line.split(",")
        convert_to_numeric(values)
        instances.append(values)
    
    file.close()

    return instances

def convert_to_numeric(values):
    '''
    Convert values in values to numeric
    Paramter values: The values that need to be converted to numeric value
    '''

    for i in range(len(values)):
        try:
            numeric_val = int(values[i])
            values[i] = numeric_val
        except ValueError:
            pass
        try:
            float_val = float(values[i])
            values[i] = float_val
        except ValueError:
            pass    


def main():
    plt.figure()
    xs = [1,2,3,4,5,6,7,8,9,10]
    x_ticks = []
    ys = []
    for i in range(100, 1100, 100):
        print(i)
        x_ticks.append(i)
        table = getTable("./results/requests_%i.csv" % (i))
        ys.append(table[-1][-5])
    print(xs)
    print(ys)
    plt.bar(xs, ys)
    plt.xticks(xs, x_ticks)
    plt.title("Number of Users vs. Response Time")
    plt.ylabel("Average Response Time")
    plt.xlabel("Number of Users")
    plt.savefig("Users_vs_response-time.pdf")


if __name__ == "__main__":
    main()