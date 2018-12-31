dictionary = readTextFile('file:\\\\C:\\Users\\murtazashiraz\\Desktop\\Spelling Correction\\dictionary.txt');
dictionary = dictionary.split('\n')


function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    var allText;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return allText;
}





function check(word, dictionary) {
  var found = 'false'
  for(var i = 0; i < dictionary.length; i++) {
    dictionary_word = dictionary[i].split(',')[0]
    if(dictionary_word == word) {
      found = 'true'
    }
  }
  return found
}

  
function suggest_correction(incorrect_word, dictionary) {
  var suggestions_dists = []
  var suggestions_sorted = []
  
  for(var i = 0; i < dictionary.length; i++) {
    entry = dictionary[i]
    entry = entry.split(',')
    dictionary_word = entry[0]
    word_frequency = Number(entry[1])
    
    distance = Levenshtein.get(incorrect_word, dictionary_word)

    if(distance == 2) {
      suggestions_dists.push([word_frequency, dictionary_word]);   
    }
    else if(distance == 1) {
      suggestions_dists.push([word_frequency + 100000000, dictionary_word]);    //Big number added for distance == 1  
    }
    else if(incorrect_word == dictionary_word) {
      return true   
    }

  }
  suggestions_dists = suggestions_dists.sort(function(a, b){return b[0] - a[0];});
  for(var i = 0; i < suggestions_dists.length; i++) {
        suggestions_sorted.push(suggestions_dists[i][1]);
  }
  if(suggestions_sorted.length > 10) {                       //Only take top 10 suggestions
    suggestions_sorted = suggestions_sorted.slice(0,10);
  }
 
  return suggestions_sorted;
}


//document.write(suggest_correction('bookh', dictionary));
