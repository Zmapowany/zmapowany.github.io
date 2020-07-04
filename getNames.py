import os
import glob

names_walls = [os.path.basename(x) for x in glob.glob('./badges/*')]

#print(names_walls)


index2 = len(names_walls)

#init list for edited names
names_bld =[]

#erase prefix to enable group by gml_id
for i in range (index2):
    name = names_walls[i]
    #JustName = name[:-5]
    Full = "./badges/" + name
    names_bld.append(Full)

names_bld = "\n".join(names_bld)
print(names_bld)

