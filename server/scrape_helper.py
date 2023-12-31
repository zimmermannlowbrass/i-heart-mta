def fix_spelling_errors_from_scrape(content):
    content = content.replace('-', ' ')
    content = content.replace('   ', ' ')
    content = content.replace('  ', ' ')
    content = content.replace('/ ', '/')
    content = content.replace('Ave', 'Av')
    content = content.replace('Square', 'Sq')
    content = content.replace('Street', 'St')
    content = content.replace('Parkway', 'Pkwy')
    content = content.replace('Pk', 'Park')
    content = content.replace('Plwy', 'Pkwy')
    content = content.replace('Parkwy', 'Pkwy')
    content = content.replace('Cty', 'Ctr')
    content = content.replace('Heights', 'Hts')
    content = content.replace('42 St Grand Central', 'Grand Central 42 St')
    content = content.replace('42 St/Port Authority Bus Terminal', '42 St Port Authority Bus Terminal')
    content = content.replace('W 4 Wash Sq','W 4 St Wash Sq')
    content = content.replace('161 Yankee Stadium','161 St Yankee Stadium')
    content = content.replace('4 Av 9 Sts', '4 Av')
    content = content.replace('Avnue', 'Avenue')
    content = content.replace('Delancey St /Essex St', 'Essex St')
    content = content.replace('Newtown', '')
    content = content.replace('57 7 Av', '57 St 7 Av')
    return content.strip()

def color_of_subway_route(subway):
    if subway in ['1','2','3']:
        return 'Red'
    elif subway in ['4','5','6']:
        return 'Green'
    elif subway == '7':
        return 'Purple'
    elif subway in ['A','C','E']:
        return 'Blue'
    elif subway in ['B','D','F','M']:
        return 'Orange'
    elif subway in ['N','Q','R','W']:
        return 'Yellow'
    elif subway in ['J','Z']:
        return 'Brown'
    elif subway in ['L','S']:
        return 'White'
    elif subway == 'G':
        return 'Lime'
    