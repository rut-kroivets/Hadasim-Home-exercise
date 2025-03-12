# Hadasim-HMO

## הוראות שימוש בתוכנה:
#### 1.נפתח את תוכנית השרת ונתקין דרכה את הDB על המחשב:
נפתח את מנהל החבילות (נוודא שאנחנו על פרוייקט הData) ונריץ בו את הפקודה: "Add-Migration "The name of migration.
#### ולאחר מכן נריץ את הפקודה: Update-Database. ובכך הDB התעדכן!
#### 2. כעת נריץ את השרת.
#### 3.נריץ בCMD של ניתוב תיקיית הלקוח (ניתן להריץ גם בTerminal בתוך הפרוייקט) את הפקודה: npm i ולאחר מכן npm run dev.
וכעת יפתח לנו הדפדפן ובו תוצג האפליקציה.
## פירוט התצוגה הויזואלית:
זהו דף הכניסה שבו ניתן לראות את כל החברים בקופת החולים. לכל חבר יש אופציה למחיקת החבר על ידי כפתור.
![צילום מסך 2024-03-27 224924](https://github.com/rut-kroivets/Hadasim-Home-exercise/assets/149902635/afb70d5a-75b4-45f2-934c-1ee137894492)

בנוסף ישנו כפתור הוספת חבר חדש למערכת קופת החולים, בעת לחיצה על כפתור זה,יפתח המסך הבא:
![צילום מסך 2024-03-27 225210](https://github.com/rut-kroivets/Hadasim-Home-exercise/assets/149902635/20b47826-9b69-4db4-87c9-df405fb455e5)

כאשר לוחצים על חבר מסוים מרשימת החברים נעבור למסך הבא:
![image](https://github.com/rut-kroivets/Hadasim-Home-exercise/assets/149902635/070aa597-9591-4118-9fa5-4a4a5cc75be4)


בלחיצה על כפתור העריכה יפתח המסך:
![צילום מסך 2024-03-27 234340](https://github.com/rut-kroivets/Hadasim-Home-exercise/assets/149902635/20f03a3e-4bca-4efb-9e9f-46c7473550bb)

def func(path_list: list, path: str) -> int:
    count: int = path.count('/')
    lst: list = path.split('/')
    def_str: str = ''
    p_list = [x.replace('/','') for x in path_list]
    for x in lst:
        if def_str in p_list:
            count -= 1
        def_str = def_str + x
    return count

func = lambda dic : {dic[x] : x for x in dic}










