const questionImage =  (store, ques) => {
   console.log("----------");
    const images = fetch(`http://localhost:8081/api/user/dashboard/verified-questions`)
     .then((res) => res.json())
     .then((ques)=> {for(let i in ques){
        const a=`<li class="list-group-item"><a href="./answer.html?userId=${ques[i].id}">${ques[i].description}</a></li><br>`
        document.getElementById('question-list').innerHTML = document.getElementById('question-list').innerHTML + a;
     }})
     // return rovers;
 };
 questionImage('verified-questions');