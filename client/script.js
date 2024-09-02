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