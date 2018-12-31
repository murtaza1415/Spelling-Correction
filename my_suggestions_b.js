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





function leven_distance(a, b){
  if(a.length === 0) return b.length;
  if(b.length === 0) return a.length;

  var matrix = [];

  // increment along the first column of each row
  var i;
  for(i = 0; i <= b.length; i++){
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for(j = 0; j <= a.length; j++){
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for(i = 1; i <= b.length; i++){
    for(j = 1; j <= a.length; j++){
      if(b.charAt(i-1) == a.charAt(j-1)){
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                Math.min(matrix[i][j-1] + 1, // insertion
                                         matrix[i-1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
}





function suggest_correction(incorrect_word, dictionary) {
  var suggestions_dists = []
  var suggestions_sorted = []
  
  for(i = 0; i < dictionary.length; i++) {
    entry = dictionary[i]
    entry = entry.split(',')
    dictionary_word = entry[0]
    word_frequency = Number(entry[1])
    
    distance = leven_distance(incorrect_word, dictionary_word)
    if(distance == 1) {
        suggestions_dists.push([word_frequency + 100000000, dictionary_word]);    //Big number added for distance == 1
    }
    if(distance == 2) {
        suggestions_dists.push([word_frequency, dictionary_word]);   
    }
  }
  suggestions_dists = suggestions_dists.sort(function(a, b){return b[0] - a[0];});
  for(i = 0; i < suggestions_dists.length; i++) {
        suggestions_sorted.push(suggestions_dists[i][1]);
  }
  if(suggestions_sorted.length > 10) {                       //Only take top 10 suggestions
    suggestions_sorted = suggestions_sorted.slice(0,11);
  }
 
  return suggestions_sorted;
}


//document.write(suggest_correction('bookh', dictionary));
