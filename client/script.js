async function adduser(event){
    event.preventDefault();
    console.log('reached here');
    

    let id = document.getElementById('id').value;
    let title = document.getElementById('title').value
    let price = document.getElementById('price').value 
    let description = document.getElementById('description').value;
    let category= document.getElementById('category').value;
    let imageurl = document.getElementById('imageurl').value;
    let rate = document.getElementById('rate').value;
    let count = document.getElementById('count').value;
   

    console.log('id',id)
    console.log('title',title)
    console.log('price',price);
    console.log('description',description);
    console.log('category',category);
    console.log('imageurl',imageurl)
    console.log('rate',rate)
    console.log('count',count);

    let datas = {
        id,
        title,
        price,
        description,
        category,
        imageurl,
        rate,
        count
    }
    console.log('datas',datas)

    let json_data = JSON.stringify(datas);
    console.log('json_data',json_data);

    let response = await fetch('/submit',{
        method : 'POST',
        headers : {
            "Content-Type" : "application/json"
        },
        body : json_data,
    });
    console.log('resposne',response);



}

 async function viewdata(){
    try {
        let datas = await fetch('/submit')
        console.log("fetched",datas)

        let parsed_datas =await datas.json();
        console.log("parsed_datas",parsed_datas);

        let datacontainer = document.getElementById('datacontainer')
        let rows = ''

        for(i=0;i<parsed_datas.length;i++){
            rows = rows+`
             <div class="container mt-5 shadow p-3 mb-5 bg-body rounded lh-lg">
        <div id = "imageid" ><img onclick="handleClick(${parsed_datas[i].id})" src ="${parsed_datas[i].imageurl} "class = "datacontainerimg"></div>
        <div id = "titleid">${parsed_datas[i].title}</div>
        <div id = "descriptionid">${parsed_datas[i].description.slice(0,15)+"..."}</div>
        <div id = "categoryid">${parsed_datas[i].category}</div>
         <div id = "priceid">${parsed_datas[i].price}</div>
        <div id = "ratingid">Rating : ${parsed_datas[i].ratingrate}</div>
        
       </div>

            `
        }
        datacontainer.innerHTML = rows;
    } catch (error) {
        console.log("error",error)
    }
}



