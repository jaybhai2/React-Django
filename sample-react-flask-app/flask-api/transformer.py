import re


class Transformer:

    def capitalize(data:str):
        return data.upper()
    
    def remove_leading_space(data:str):
        pattern = '^\s*'
        
        return re.sub(pattern=pattern, repl='', string=data)