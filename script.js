let answer, row, column;
row=0;
column=0;
var grid_arr;
let correct, data;
async function LoadJSON() {
    try {
        // let response = await fetch("./data.json");
        // let data = await response.json();
        data = JSON.parse(JSON.stringify(data_))
        LoadAnswer(data);
        console.log(data["Sheet1"][5543]["자모분리"]+"님 반갑습니다.");
        LoadGrid();
        /*
        data["Sheet1"].forEach(row => {
            let word = row["자모분리"];
            let span = document.createElement('span');
            span.textContent = word;
            outputDiv.appendChild(span);
            outputDiv.appendChild(document.createElement('br'));
            
        });
        */
    } catch (error) {
        console.log(error);
        alert("JSON 파일을 불러오는 중 오류 발생");
    }
    return;
}

//새 게임
function NewGame(){
    row=0;
    column=0;
    LoadAnswer(data);
    LoadGrid();
    return;
}

//정답 생성
function LoadAnswer(data){
    //var buttonValue = document.getElementById("button").innerHTML;
    //console.log(`buttonvalue:${buttonValue}`);
    var i=0;
    var randomValue=Math.floor(Math.random()*5544);
    if(randomValue == 5544){
        randomValue=5543;
    }
    /*
    if(buttonValue != "" && data["Sheet1"][randomValue]["자모분리"].length != Number(buttonValue)){
        LoadAnswer(data);
        return;
    }
    */
    answer = data["Sheet1"][randomValue];
    return;
}

//grid 전체 만들기
function LoadGrid(){
    //grid_container 접근
    const grid_container = document.getElementById("grid-container");

    //grid_container 초기화
    grid_container.innerHTML = "";

    //grid cell 설정
    grid_arr = new Array();
    for(i=0;i<6;i++){
        //grid 추가
        let gridchild = document.createElement("div");
        gridchild.className = "grid";
        gridchild.style.gridTemplateColumns = `repeat(${answer["자모분리"].length}, 50px)`;
        grid_container.append(gridchild);

        //cell 추가
        grid_arr.push(new Array());
        for(j=0;j<answer["자모분리"].length;j++){
            grid_arr[i].push(document.createElement('div'))
            grid_arr[i][j].className = "cell";
            gridchild.append(grid_arr[i][j]);
        }
    }
    return;
}

//키 입력 시 cell 내용 바꾸기
function UpdateCell(word){
    if(column < answer["자모분리"].length){
        grid_arr[row][column].innerHTML = word;
        column++;
    }
    else{
        return;
    }
}

//정답 확인
function CheckCells(){
    var checking = [...answer["자모분리"]];
    correct=0;

    for(i=0;i<answer["자모분리"].length;i++){
        var str = grid_arr[row][i].innerHTML;
        if(str==checking[i]){
            grid_arr[row][i].className = "cell correct";
            document.getElementById(str).className = "key correct";
            checking[i] = "";
            correct++;
        }
    }

    for(i=0;i<answer["자모분리"].length;i++){
        var str = grid_arr[row][i].innerHTML;
        if(grid_arr[row][i].className != "cell correct"){
            for(j=0;j<checking.length;j++){
                if(str==checking[j]){
                    grid_arr[row][i].className = "cell present";
                    if(document.getElementById(str).className != "key correct"){
                        document.getElementById(str).className = "key present";
                    }
                    checking[j] = "";
                    break;
                }
                if(grid_arr[row][i].className != "cell correct" && grid_arr[row][i].className != "cell present"){
                    grid_arr[row][i].className = "cell absent";
                }
                if(document.getElementById(str).className != "key correct" && document.getElementById(str).className != "key present"){
                    document.getElementById(str).className = "key absent";
                }
                
            }
        }
    }

    if(correct != answer["자모분리"].length){
        NextRow();
    }
    else{
        alert(`정답!
            답 : ${answer["정규화된단어"]}
            ESC를 누르면 다음 문제가 등장합니다.`);
    }
    return;
}

//다음 줄로 넘어가기
function NextRow(){
    if(row<5){
        row++;
        column=0;
    }else{
        alert(`실패!
            정답 : ${answer["정규화된단어"]}`);
        NewGame();
    }
    return;
    
}

function InputCell(key){
    if(key == 'q'){
        UpdateCell("ㅂ");
    }
    else if(key == 'w'){
        UpdateCell("ㅈ");
    }
    else if(key == 'e'){
        UpdateCell("ㄷ");
    }
    else if(key == 'r'){
        UpdateCell("ㄱ");
    }
    else if(key == 't'){
        UpdateCell("ㅅ");
    }
    else if(key == 'y'){
        UpdateCell("ㅛ");
    }
    else if(key == 'u'){
        UpdateCell("ㅕ");
    }
    else if(key == 'i'){
        UpdateCell("ㅑ");
    }
    else if(key == 'a'){
        UpdateCell("ㅁ");
    }
    else if(key == 's'){
        UpdateCell("ㄴ");
    }
    else if(key == 'd'){
        UpdateCell("ㅇ");
    }
    else if(key == 'f'){
        UpdateCell("ㄹ");
    }
    else if(key == 'g'){
        UpdateCell("ㅎ");
    }
    else if(key == 'h'){
        UpdateCell("ㅗ");
    }
    else if(key == 'j'){
        UpdateCell("ㅓ");
    }
    else if(key == 'k'){
        UpdateCell("ㅏ");
    }
    else if(key == 'l'){
        UpdateCell("ㅣ");
    }
    else if(key == 'z'){
        UpdateCell("ㅋ");
    }
    else if(key == 'x'){
        UpdateCell("ㅌ");
    }
    else if(key == 'c'){
        UpdateCell("ㅊ");
    }
    else if(key == 'v'){
        UpdateCell("ㅍ");
    }
    else if(key == 'b'){
        UpdateCell("ㅠ");
    }
    else if(key == 'n'){
        UpdateCell("ㅜ");
    }
    else if(key == 'm'){
        UpdateCell("ㅡ");
    }
    // else if(key == "Enter"&& column == answer["자모분리"].length){
    //     var str="";
    //     for(i=0;i<answer["자모분리"].length;i++){
    //         str+=grid_arr[row][i];
    //     }
    //     for(i=0;i<5544;i++){
    //         if(str == answer["자모분리"]){
    //             CheckCells();
    //             break;
    //         }
    //     }
    //     alert("리스트에 없는 단어입니다.");
    //     column =0;
    //     for(i=0;i<answer["자모분리"].length;i++){
    //         grid_arr[row][i].innerHTML = "";
    //     }
    // }
    else if(key == "Enter"&& column == answer["자모분리"].length){
        CheckCells();
    }
    else if(key == "Backspace" && column>0){
        column--;
        grid_arr[row][column].innerHTML = "";
    }
    else if(key == "Escape"&&correct==answer["자모분리"].length){
        NewGame();
    }
}

// 페이지 로딩 시 JSON 데이터 가져오기
window.onload = LoadJSON;

//키보드 입력 반응
document.addEventListener('keydown', (event) => {
    InputCell(event.key);
});