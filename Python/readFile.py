import os
import random

def randomPara():
    fs = open('../user_details/src/components/TextData/textGenerator.txt', 'r')

    fileContent = fs.read().split('\n')
    fileContent = list(fileContent)

    fileData = []

    for i in range(len(fileContent)):
        if fileContent[i] != '':
            fileData.append(fileContent[i])

    fs.close()

    return random.choice(fileData)

print(randomPara())
