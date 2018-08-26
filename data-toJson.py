import json

negative=str(open('_Negative.txt','r').read())
positive=str(open('_Positive.txt','r').read())
uncertainty=str(open('_Uncertainty.txt','r').read())

positive=positive.split()[6:]
negative=negative.split()[6:]
uncertainty=uncertainty.split()[6:]
dik={"positive":[],"negative":[],"uncertainty":[]}
for word in positive:
    dik["positive"].append(word)

for word in negative:
    dik["negative"].append(word)

for word in uncertainty:
    dik["uncertainty"].append(word)


with open("word_dictionary.json",'w') as f:
    json.dump(dik,f)