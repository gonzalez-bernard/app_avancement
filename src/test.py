import sys, json, numpy as np

#Read data from stdin
def read_in():
    if   isinstance(sys.stdin, str):
        print(json.dumps("STR"))
        #data = sys.stdin.readlines()
    else:
        #print(json.dumps("OTHER"))
        lines = sys.stdin.readlines()
        data = json.loads(lines[0])
        print(json.dumps(data))
    sys.stdout.flush()

    #Since our input would only be having one line, parse our JSON data from that
    #return json.loads(lines[0])

def main():
    #f = open('debug.txt','w')

    #get our data as an array from read_in()
    lines = read_in()

    #create a numpy array
    #np_lines = np.array(lines)

    #use numpys sum method to find sum of all elements in the array
    #lines_sum = np.sum(np_lines)

    #return the sum to the output stream
    #f.write('result = '+ str(line_sum)
    #f.close()
    #print (lines_sum)
    pass
#start process

if __name__ == '__main__':
    main()