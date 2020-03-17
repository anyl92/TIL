```python
import datetime

allmonth = [0, 31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

def getDays(year, month):

    if month == 2:
        if((year % 4) == 0) and ((year % 100) != 0) or ((year % 400 ) == 0):
            return 29
        else:
            return 28
    else:
        return allmonth[month]

dt = datetime.datetime.today()

print(getDays(dt.year, dt.month))
```

