// Steps to perform in this assignment :
// 1. Parse the JSON file
// 2. Go inside 'Body > Recommendations' 
// 3. Print name of Restaurant 
// 4. Go inside 'Body > Recommendations' 
// 5. Go inside menu 
// 6.  Loop for each menu (there can be multiple menus)
// 7.  Check whether type=sectionheader. If it is - go inside its 'children
// 8. Check whether type=item. If it is, check whether selected=1. If both are true, print the name of item, and go inside its children.
// 9. Check whether selected=1 (no need to pay attention to the 'type' now that we are inside children of 'item'). If selected was 1 then print the name of child, and go further deep inside the children
//  Repeat the last step infinitely - until we have reached the deepest child
const fs = require('fs');
const jsonFileLocal = require('./foodyo_output.json');
let jsonData;
function getTabbedString(count){
    let tabbedString = "";
    for(let i=0;i<count;i++){
        tabbedString= tabbedString+"--";
    }
    return tabbedString;
}
function printChildren(children,nestedLevelCount){
    children.map(child => {
        if(child && child.selected === 1){
            let tabbedString = getTabbedString(nestedLevelCount);
            console.log(`${tabbedString}---> Children: ${child.name}`);
            if (child.children){
                printChildren(child.children,nestedLevelCount+=1);
            }    }
    })
}

fs.readFile('./foodyo_output.json',function(error,fileData){
    jsonData = JSON.parse(fileData);
    recommendations = jsonData.body.Recommendations;
    recommendations.map(resturant => {
        console.log(`Restaurant Name: ${resturant.RestaurantName}`);
        if (resturant.menu){
            let tabCount = 1;
            resturant.menu.map(menuItem =>{
                if(menuItem.type === "sectionheader"){
                    menuItem.children.map(childrenData =>{
                        if (childrenData.type === "item" && childrenData.selected === 1){
                            let tabString = getTabbedString(tabCount);
                            console.log(`${tabString}> Children : ${childrenData.name}`);
                            if (childrenData.children){
                                printChildren(childrenData.children,1);
                            }
                        }
                    })
                }
                
            })
        }
       console.log(' ')
    })
})
