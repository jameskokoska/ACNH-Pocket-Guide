def openFile(fileName):
    fileIn = open(fileName + ".txt", "r", encoding="utf-8")
    coreList = []
    for line in fileIn:
        coreList.append(line.rstrip("\n"))
    fileIn.close()
    return(coreList)

def writeFile(fileName, string):
    fileOut = open(fileName + ".json", "a", encoding="utf-8")
    fileOut.write(string+"\n")
    fileOut.close()
    return

input("Enter to start")
dataList = openFile("data")
fileName = "";
percent = 0;

for lineNumber in range(0,len(dataList)):
    if(percent != int((lineNumber/len(dataList))*100)):
        percent = int((lineNumber/len(dataList))*100)
        print("Percent: " + str(int((lineNumber/len(dataList))*100)) + "% " + " -> " + str(lineNumber) + "/" + str(len(dataList)))
    if("[" in dataList[lineNumber]):
        fileName = (dataList[lineNumber][0:(len(dataList[lineNumber])-3)])
        fileName = fileName.replace(" ", "")
        fileName = fileName.replace('"', "")
        fileName = fileName.lower()
        print("Started: " + str(fileName))
    if(fileName!=""):
        if("[" in dataList[lineNumber]):
            writeFile(fileName, "[")
        elif("]" in dataList[lineNumber]):
            writeFile(fileName, "]")
        elif(("{" in dataList[lineNumber] or "}" in dataList[lineNumber]) and (lineNumber==len(dataList)-1 or lineNumber == 0)):
            writeFile(fileName, "")
        else:
            writeFile(fileName, str(dataList[lineNumber]))
    
print("Done!")
input("")
