import glob
import subprocess
import os

for file in glob.glob("*.json"):
    process = subprocess.run(['mongoimport','--db', 'danskill', '--collection', os.path.splitext(file)[0], '--file', file, '--jsonArray', '--drop'], \
    	check=True, stdout=subprocess.PIPE, universal_newlines=True)
    output = process.stdout
    output
