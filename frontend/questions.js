const questionImage =  (store, ques) => {
   
    const images = fetch(`http://localhost:3000/dashboard/${ques}`)
     .then((res) => res.json())
     .then((ques) => console.log(ques))
     .then((question) => updateStore(store, { questions }));
     // return rovers;
 };
 questionImages(getQuestions);