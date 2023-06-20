from model.response import Response
import asyncio
from fastapi import HTTPException
from typing import List
import pandas as pd
import numpy as np
from string_grouper import match_strings, match_most_similar, \
    group_similar_strings, compute_pairwise_similarities, \
    StringGrouper
from datetime import datetime, timedelta

class SummaryService:
    def __init__(self, ):
        pass

    async def summary(self, list_object: list):  # [a,b,c,d,e] -> [[a],[b,c],[d,e]]
        ###
        ###
        # Removing older data before 2021
        new_obj_list = []
        for obj in list_object:
            date = datetime.strptime(obj['date'].split(' ')[1], '%d/%m/%Y')
            dest_time = datetime.now() - timedelta(days=365)
            if date < dest_time:
                continue
            new_obj_list.append(obj)

        # Matching data
        dictionary = {}
        list_str = []
        for obj in obj:
            obj["title"] = obj["title"].lower()
            title = obj["title"]
            if title not in dictionary.keys():
                dictionary[title] = []    
                dictionary[title].append(obj)
            else:
                dictionary[title].append(obj)
            list_str.append(obj["title"].lower())
        import numpy as np
        df = group_similar_strings(pd.Series(list_str))

        list_group_index = list(df["group_rep_index"])
        unique = np.unique(list_group_index)
        # print(unique)
        results = []
        for u in unique:
            res = []
            tmp = df[df["group_rep_index"] == u]
            for index, row in tmp.iterrows():
                res.append(row["group_rep"])
            results.append(res)
            # break
        # print("RESULTS:", results)
        final = []
        for gr in results:
            tmp = []
            for x in gr:
                for t in dictionary[x]:
                    tmp.append(t)
            final.append(tmp)
        # print("FINAL:", final)
        return final
