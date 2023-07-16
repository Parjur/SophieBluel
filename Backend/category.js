const categoryList = await fetch('http://localhost:5678/api/categories').then(response => response.json());
console.log(categoryList);
for (let i = 0; i > categoryList.length ; i++){
    if(categoryList[i].name === category.value){
        category.value = categoryList[i].id
    }else{
        return;
    }
}