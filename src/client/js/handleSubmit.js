function handleSubmit(event) {
  event.preventDefault()
  const formText = document.getElementById('article-url').value

  if(Client.CheckUserUrl(formText)) {
  console.log("::: Form Submitted :::");

  postData('http://localhost:8000/addData', {url: formText})

  .then(function(newData) {
        document.querySelector(
          ".results",
        ).innerHTML = `<h4> Agreement is: ${newData.agreement} </h4>
        <h4> Subjectivity is: ${newData.subjectivity} </h4>
        <h4> Confidence is: ${newData.confidence} </h4>
        <h4> Irony is: ${newData.irony} </h4>
        <h4> Score Tag is:</h4>` +scoretag((newData.score_tag)); 
  })
  } else {
      alert('Seems like an invalid URL, please try with a valid URL.');
  }
}

    const postData = async ( url = '', data = {})=>{
    console.log(data);
    const response = await fetch('http://localhost:8000/addData', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
    try {
      const newData = await response.json();
      console.log(newData);
      return newData;

    }catch(error) {
    console.log("error", error);
  }
    }

    const scoretag = (x) => { 
      let display;
      switch (x)
      {
      case 'P+':
      display = 'strong positive';
      break;
      case 'P':
      display = 'positive';
      break;
      case 'NEU':
      display = 'neutral';
      break;
      case 'N':
      display = 'negative';
      break;
      case 'N+':
      display = 'strong negative';
      break;
       case 'NONE':
                  document.write("Good job<br />");}                                                                 
                  
                  return display.toUpperCase();
      }

 
export { handleSubmit }
export { scoretag }
