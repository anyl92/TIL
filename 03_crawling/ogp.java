Document doc;
    String url = "https://www.youtube.com/watch?v=B2z5C_Mesx0&#8221";
    Map<String, List<String>> result = new HashMap<String,List<String>>();
    
    try {
        doc = Jsoup.connect(url).get();
        Elements ogElements = doc.select("meta[property^=og], meta[name^=og]");
        for (Element e : ogElements) {
            String target=target = e.hasAttr(“property”) ? “property”:“name”;
            
            if(!result.containsKey(e.attr(target))){
                result.put(e.attr(target), new ArrayList<String>());
            }
            result.get(e.attr(target)).add(e.attr(“content”));
        }
        
        for(String s : result.keySet())
        System.out.println(s + ” : “ + result.get(s));
        
    } catch (Exception e){
        e.printStackTrace();
    }