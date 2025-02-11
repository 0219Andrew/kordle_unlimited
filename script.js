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
    let button_ = document.getElementById("button");
    if(button_.value!=''){
        console.log("Ddddddd");
        if(answer["자모분리"].length!=button_.valueAsNumber){
            console.log(`answer["자모분리"].length:${answer["자모분리"].length},type:${typeof(answer["자모분리"].length)},button_.value:${button_.valueAsNumber},type:${typeof(button_.valueAsNumber)}`)
            return NewGame();
        }
    }
    console.log(answer["자모분리"].length!=button_.valueAsNumber);
    console.log(`aaaaa${answer["자모분리"].length}`);
    console.log(answer["자모분리"]);
    return;
}

//grid 전체 만들기
function LoadGrid(){
    //grid_container 접근
    const grid_container = document.getElementById("grid-container");
    const keyboard_container = document.getElementById("keyboard-container");

    //grid_container 초기화
    grid_container.innerHTML = "";
    keyboard_container.innerHTML = `<div class="keyboard-row">
            <div class="key" id="ㅂ" onclick="InputCell('q')">ㅂ</div>
            <div class="key" id="ㅈ" onclick="InputCell('w')">ㅈ</div>
            <div class="key" id="ㄷ" onclick="InputCell('e')">ㄷ</div>
            <div class="key" id="ㄱ" onclick="InputCell('r')">ㄱ</div>
            <div class="key" id="ㅅ" onclick="InputCell('t')">ㅅ</div>
            <div class="key" id="ㅛ" onclick="InputCell('y')">ㅛ</div>
            <div class="key" id="ㅕ" onclick="InputCell('u')">ㅕ</div>
            <div class="key" id="ㅑ" onclick="InputCell('i')">ㅑ</div>
        </div>
        <div class="keyboard-row">
            <div class="key" id="ㅁ" onclick="InputCell('a')">ㅁ</div>
            <div class="key" id="ㄴ" onclick="InputCell('s')">ㄴ</div>
            <div class="key" id="ㅇ" onclick="InputCell('d')">ㅇ</div>
            <div class="key" id="ㄹ" onclick="InputCell('f')">ㄹ</div>
            <div class="key" id="ㅎ" onclick="InputCell('g')">ㅎ</div>
            <div class="key" id="ㅗ" onclick="InputCell('h')">ㅗ</div>
            <div class="key" id="ㅓ" onclick="InputCell('j')">ㅓ</div>
            <div class="key" id="ㅏ" onclick="InputCell('k')">ㅏ</div>
            <div class="key" id="ㅣ" onclick="InputCell('l')">ㅣ</div>
        </div>
        <div class="keyboard-row">
            <div class="action-key" tag="Enter" onclick="InputCell('Enter')">입력</div>
            <div class="key" id="ㅋ" onclick="InputCell('z')">ㅋ</div>
            <div class="key" id="ㅌ" onclick="InputCell('x')">ㅌ</div>
            <div class="key" id="ㅊ" onclick="InputCell('c')">ㅊ</div>
            <div class="key" id="ㅍ" onclick="InputCell('v')">ㅍ</div>
            <div class="key" id="ㅠ" onclick="InputCell('b')">ㅠ</div>
            <div class="key" id="ㅜ" onclick="InputCell('n')">ㅜ</div>
            <div class="key" id="ㅡ" onclick="InputCell('m')">ㅡ</div>
            <div class="action-key" tag="Backspace" onclick="InputCell('Backspace')">삭제</div>
        </div>`;

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
/*
function CheckCells(){
    console.log(`CheckCells`);
    var has=0;
    var gridarr='';
    for(i=0;i<answer["자모분리"].length;i++){
        console.log("kkk");
        gridarr+=grid_arr[row][i].innerText;
        console.log(`grid_arr[row][i].innerHTML:${grid_arr[row][i].innerHTML}`);
        console.log(`String(grid_arr[row][i].innerHTML):${String(grid_arr[row][i].innerHTML)}`);    
        console.log(`grid_arr[row][i].innerHTML:${grid_arr[row][i].innerHTML}, type:${typeof(grid_arr[row][i].innerHTML)}`);
        console.log(`String(grid_arr[row][i].innerHTML):${String(grid_arr[row][i].innerHTML)}, type:${typeof(String(grid_arr[row][i].innerHTML))}`);
    }
    console.log(`grid_arr[row][0].innerHTML:${grid_arr[row][0].innerHTML}, type:${typeof(grid_arr[row][0].innerHTML)}`);
    console.log(`String(grid_arr[row][0].innerHTML):${String(grid_arr[row][0].innerHTML)}, type:${typeof(String(grid_arr[row][0].innerHTML))}`);
    console.log(`전:${"ㅈ"+"ㅓ"+"ㄴ"}`);
    console.log(`gridarr:${gridarr}`);
    var words = WordleMaking(gridarr);
    for(i=0;i<words.length;i++){
        for(j=0;j<words[i].length;j++){
            words[i][j]=String.fromCharCode(words[i][j]);
        }
        console.log(location.origin);
        fetch(`https://stdict.korean.go.kr/api/search.do?certkey_no=7298&key=534F730BB5E49F5F9EDE3F9E399BCFD6&type_search=search&req_type=json&q=${words[i]}`).then(res => res.json()).then(data => {
                if(data["channel"]["item"] != null){
                    console.log(data["channel"]["item"][0]);
                    has=1;
                }
                console.log(data["channel"]["item"]);
            }
        );
    }
    if(has==1){
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
    }
    else{
        console.log(6);
        alert("없는 단어입니다.");
    }

    
    return;
}
*/

function CheckCells(){
    console.log(`CheckCells`);
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
    else if(key == "Escape"){
        NewGame();
    }
}

// 페이지 로딩 시 JSON 데이터 가져오기
window.onload = LoadJSON;



//키보드 입력 반응
document.addEventListener('keydown', (event) => {
    InputCell(event.key);
});

// 초성 리스트. 00 ~ 18 19개
const CHOSUNG_LIST = ['ㄱ', 'ㄱㄱ', 'ㄴ', 'ㄷ', 'ㄷㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅂㅂ', 'ㅅ', 'ㅅㅅ', 'ㅇ', 'ㅈ', 'ㅈㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
// 중성 리스트. 00 ~ 20 21개
const JUNGSUNG_LIST = ['ㅏ', 'ㅏㅣ', 'ㅑ', 'ㅑㅣ', 'ㅓ', 'ㅓㅣ', 'ㅕ', 'ㅕㅣ', 'ㅗ', 'ㅗㅏ', 'ㅗㅏㅣ', 'ㅗㅣ', 'ㅛ', 'ㅜ', 'ㅜㅓ', 'ㅜㅓㅣ', 'ㅜㅣ', 'ㅠ', 'ㅡ', 'ㅡㅣ', 'ㅣ']
// 종성 리스트. 00 ~ 27 + 1(1개 없음) 28개
const JONGSUNG_LIST = [' ', 'ㄱ', 'ㄱㄱ', 'ㄱㅅ', 'ㄴ', 'ㄴㅈ', 'ㄴㅎ', 'ㄷ', 'ㄹ', 'ㄹㄱ', 'ㄹㅁ', 'ㄹㅂ', 'ㄹㅅ', 'ㄹㅌ', 'ㄹㅍ', 'ㄹㅎ', 'ㅁ', 'ㅂ', 'ㅂㅅ', 'ㅅ', 'ㅅㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
// 자음 리스트 14개
const JAEUM_LIST = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
// 모음 리스트 10개
const MOEUM_LIST = ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ']


//초성과 자음의 배열을 자음은 1로, 모음은 2로 표현.
function ChoJungCheck(gridarr){
    var str = gridarr.split('');
    console.log(`ChoJungCheck::str:${str}`);
    for(i=0;i<str.length;i++){
        for(j=0;j<JAEUM_LIST.length;j++){
            console.log(`str[${i}] == JAEUM_LIST[${j}]:${str[i] == JAEUM_LIST[j]}`);
            if(str[i] == JAEUM_LIST[j]){
                str.splice(i,1,1);
                console.log(`자음확인 완${i},${str[i]}`);
                break;
            }
        }
        for(j=0;j<MOEUM_LIST.length;j++){
            console.log(`str[${i}] == MOEUM_LIST[${j}]:${str[i] == MOEUM_LIST[j]}`);
            if(str[i] == MOEUM_LIST[j]){
                str.splice(i,1,2);
                console.log(`모음확인 완${i},${str[i]}`);
                break;
            }
        }
        console.log(`확인 루틴 끝${i}
            ----------------------------------------`);
    }
    console.log(`ChoJungCheck::str:${str.join('')}`);
    return str;
}

//배열을 자름
function Slicing(gridarr){
    //세팅
    var str=ChoJungCheck(gridarr);
    console.log(`Slicing::str:${str}`);
    let cut = new Array();
    let indexes = new Array();

    //'자음+모음'의 형태를 한 부분에서 자음에 1을 부여, 모음에 2를 부여한 배열을 만듦. 각각 시작점과 끝점을 의미함. 0은 시작점과 끝점을 제외한 구간.
    for(i=0;i<str.length;i++){
        console.log(`str[${i}]:${str[i]},str.length:${str.length}`);
        if(str[i]=='1' &&str[i+1]=='2'){
            console.log('aa');
            indexes.push(1);
        }
        else if(str[i]==2 &&str[i+1]==1){
            console.log('bb');
            indexes.push(2);
        }
        else{
            console.log('cc');
            indexes.push(0);
        }
    }
    console.log(`indexes:${indexes}`);

    if(indexes.indexOf(1)==-1){
        console.log(1);
        return -1;//없는 단어입니다.
    }else{
        if(indexes.indexOf(2)!=-1 && indexes.indexOf(2)<indexes.indexOf(1)){
            console.log(2);
            return -1;//없는 단어입니다.
        }
    }
    
    if(indexes.lastIndexOf(2)!=indexes.length-1&&indexes.lastIndexOf(2)>indexes.lastIndexOf(1)){//마지막 글자의 종성이 존재할 경우 확정적으로 앞 글자와 합침
        indexes[indexes.lastIndexOf(2)]=0;
    }
    indexes[str.length-1]=2;

    console.log(`indexes:${indexes}`);
    var prev_endindex=0;
    //시작점 예외 사항에 대한 처리
    if(indexes[0]!=1){//처음이 시작점(1)이 아닌 경우 == 된소리로 시작하는 경우
        //따로 해당 자음을 초성에 포함시키고 시작.
        prev_endindex=indexes.indexOf(2,0)+1;
        cut.push(gridarr.slice(0, prev_endindex));
    }else{
        prev_endindex=0;
    }


    while(prev_endindex < gridarr.length&&prev_endindex>-1){
        console.log(`prev_endindex < gridarr.length:${prev_endindex < gridarr.length},prev_endindex:${prev_endindex},gridarr.length:${gridarr.length}`);
        //자음자음자음의 경우 각 자음을 따로 저장
        if(indexes[prev_endindex]!=1){
            for(i=prev_endindex;i<indexes.indexOf(1,prev_endindex);i++){
                cut.push(gridarr.slice(i,i+1));
                console.log(`cut.pushing,i:${i},prev_endindex:${prev_endindex},indexes.indexOf(1,prev_endindex):${indexes.indexOf(1,prev_endindex)}`);
            }
        }
        console.log("탈출");
        //시작점부터 끝점까지를 한 단어로 저장하고 다음 시작점을 저장.
        cut.push(gridarr.slice(indexes.indexOf(1, prev_endindex),indexes.indexOf(2,prev_endindex)+1));
        if(prev_endindex>-1){
            prev_endindex = indexes.indexOf(2,prev_endindex)+1;
            if(prev_endindex==0)
                prev_endindex=-1;
            console.log(`prev_endindex:${prev_endindex}`);
        }
            
    }
    console.log(`cut:${cut}`);
    return cut;
}

//가능한 단어의 자모분리 배열 및 초성 결합
function DrStrangingChosung(gridarr){
    //세팅
    var cut=Slicing(gridarr);//모든 형태소 배열
    console.log(`DrStrangingChosung::cut:${cut}`);
    if(cut==-1){
        console.log(3);
        return -1;
    }
    var possibleArrays = new Array();
    var indexes=new Array();//해당 인덱스가 자음이고 다음 인덱스가 형태소 배열인 인덱스 값들

    //초성 결합
    for(i=0;i<cut.length;i++){
        if(cut[i].length==1 && cut[i+1].length>1)
            indexes.push(i);
    }
    console.log(`indexes mannn:${indexes}`);
    console.log("살려줘이지옥에서그만나가고싶어더이상코딩하고싶지않아오류가너무많아도대체왜형식오류가나는거야전능하신아카라트여영원한빛으로날보호하소서거룩하신지혜로날이끄시고내가는길어둠에싸여있어도신성한빛으로내영혼을이끄소서모모챤의은혜로움으로더이상이승의고통을느끼지않게하시고송곳니닦개로서의기쁨에충실하게해주소서모모챤의송곳니를통한이승에서의해방경험을하고싶사하니그대나를한입베어물어주소서살고싶다고말해!!!살고싶어!!!!너내동료가돼라!뭣?!?!정말이야?!?!너무좋아!나,루피의동료가될게더이상고통받고싶지않아날구원해줘");
    //ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    //ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd


    for(i=0;i<2**indexes.length;i++){
        possibleArrays[i]=new Array();
        for(j=0;j<cut.length;j++)
            possibleArrays[i].push(cut[j]);
    }
    for(i=0;i<possibleArrays.length;i++){
        console.log(`에라이possibleArrays[${i}]:${possibleArrays[i]}`);
    }
    for(i=0;i<indexes.length;i++){
        for(k=0;k*(2**(indexes.length-1-i))<2**indexes.length;k++){
            if(k%2==0){//자음+형태소 결합하기
                for(j=k*(2**(indexes.length-1-i));j<(k+1)*(2**(indexes.length-1-i));j++){
                    possibleArrays[j][indexes[i]+1]=[possibleArrays[j][indexes[i]],possibleArrays[j][indexes[i]+1]].join('');
                    possibleArrays[j][indexes[i]]='';
                }
            }
            // else{//자음+형태소 결합 안하기
            //     for(j=k*(2**(indexes.length-1-i));j<(k+1)*(2**(indexes.length-1-i));j++){
            //         possibleArrays[j][indexes[i]]=[possibleArrays[j][indexes[i]],possibleArrays[j][indexes[i]+1]].join('').split('');
            //         possibleArrays[j][indexes[i]+1]='';
            //     }
            // }
        }
    }

    
    //possibleArrays = bufferArray(possibleArrays);

    return [possibleArrays, cut];
}

//종성 결합
function DrStrangingJongsung(gridarr){
    //세팅
    if(DrStrangingChosung(gridarr)==-1){
        console.log(4);
        return -1;
    }
    var possibleArrays = DrStrangingChosung(gridarr)[0];
    var cut = DrStrangingChosung(gridarr)[1];
    console.log(`DrStrangingJongsung::possibleArrays:${possibleArrays},type:${typeof(possibleArrays)},cut:${cut},type:${typeof(cut[0])}`);
    for(i=0;i<possibleArrays.length;i++){
        console.log(`possibleArrays[${i}]:${possibleArrays[i]}`);
    }
    var indexes=new Array();//해당 인덱스가 자음이고 다음 인덱스가 형태소 배열인 인덱스 값들

    var start=0;
    //종성 결합
    for(j=0;j<possibleArrays.length;j++){
        for(i=0;i<possibleArrays[j].length;i++){
            console.log(`mlml:${i}`)
            if(i>0){
                if(cut[i].length>1 && start==1){
                    indexes.push(i);
                    start=0;
                }
                    
            }

            if(i+1<cut.length){
                if(cut[i].length>1 && cut[i+1].length==1){
                    indexes.push(i);
                    start=1;
                }
            }
        }
    }
    for(i=0;i<possibleArrays.length;i++){
        for(k=0;k<possibleArrays[i].length;k++){
            for(j=0;j<indexes.length/2;j++){
                possibleArrays[i][indexes[j*2]]=possibleArrays[i].slice(indexes[j*2],indexes[j*2+1]).join('');
                for(l=indexes[j*2]+1;l<indexes[j*2+1];l++){
                    possibleArrays[i][l]='';
                }
            }
        }
    }
    for(i=0;i<possibleArrays.length;i++){
        console.log(`beforbuffer::possibleArrays[${i}]:${possibleArrays[i]}`);
    }
    possibleArrays = bufferArray(possibleArrays);
    console.log(possibleArrays);
    for(i=0;i<possibleArrays.length;i++){
        console.log(`afterbuffer::possibleArrays[${i}]:${possibleArrays[i]}`);
    }
    return possibleArrays;
}

function WordleMaking(gridarr){
    var possibleArraysCode = new Array();
    var possibleArrays = DrStrangingJongsung(gridarr);
    console.log(`WordleMaking::possibleArrays:${possibleArrays}`);
    for(i=0;i<possibleArrays.length;i++){
        console.log(`possibleArrays[${i}]:${possibleArrays[i]}`);
    }
    if(possibleArrays==-1){
        console.log(5);
        return -1;
    }
    var cho,jung,jong;
    for(i=0;i<possibleArrays.length;i++){
        possibleArraysCode.push(new Array());
        cho=0;
        jung=0;
        jong=0;
        fail=0;
        for(j=0;j<possibleArrays[i].length;j++){
            possibleArraysCode[i].push("가".charCodeAt(0));
            console.log(`i:${i},j:${j}`);
            for(k=0;k<CHOSUNG_LIST.length;k++){
                if(possibleArrays[i].indexOf(CHOSUNG_LIST[k])==0 && CHOSUNG_LIST[k].length>1){
                    possibleArraysCode[i][j]+=k*21*28;
                    cho=1;
                }
            }
            if(cho==0){
                for(k=0;k<CHOSUNG_LIST.length;k++){
                    if(possibleArrays[i].indexOf(CHOSUNG_LIST[k])==0){
                        possibleArraysCode[i][j]+=k*21*28;
                        cho=1;
                    }
                }
                if(cho==0)
                    fail=1;
            }

            for(k=0;k<JUNGSUNG_LIST.length;k++){
                if(possibleArrays[i].indexOf(JUNGSUNG_LIST[k])!=-1 && JUNGSUNG_LIST[k]>2){
                    possibleArraysCode[i][j]+=k*28;
                    jung=1;
                }
            }
            if(jung==0){
                for(k=0;k<JUNGSUNG_LIST.length;k++){
                    if(possibleArrays[i].indexOf(JUNGSUNG_LIST[k])!=-1 && JUNGSUNG_LIST[k]>1){
                        possibleArraysCode[i][j]+=k*28;
                        jung=1;
                    }
                }
                if(jung==0){
                    for(k=0;k<JUNGSUNG_LIST.length;k++){
                        if(possibleArrays[i].indexOf(JUNGSUNG_LIST[k])!=-1){
                            possibleArraysCode[i][j]+=k*28;
                            jung=1;
                        }
                    }
                    if(jung==0)
                        fail=1;
                }
            }

            for(k=1;k<JONGSUNG_LIST.length;k++){
                if(possibleArrays[i].indexOf(JONGSUNG_LIST[k])>1 && JONGSUNG_LIST[k]>1){
                    possibleArraysCode[i][j]+=k;
                    jong=1;
                }
            }
            if(jong==0){
                for(k=1;k<JONGSUNG_LIST.length;k++){
                    if(possibleArrays[i].indexOf(JONGSUNG_LIST[k])>1){
                        possibleArraysCode[i][j]+=k;
                        jong=1;
                    }
                }
            }

            if(fail==0)
                possibleArraysCode[i][j] = String.fromCharCode(possibleArraysCode[i][j]);
            else
                possibleArraysCode[i][j] = '';
        }
    }
    console.log("return");
    return possibleArraysCode;
}

//쓰레기 값 제거
function bufferArray(array_for_buffer_){
    var array_for_buffer = array_for_buffer_;
    for(i=0;i<array_for_buffer.length;i++){
        var j=0;
        while(j<array_for_buffer[i].length){
            if(array_for_buffer[i][j]==''){
                array_for_buffer[i].splice(j,1);
            }
            j++;
        }
        while(array_for_buffer[i][array_for_buffer.length-1]==''){
            console.log(`bf::array_for_buffer[${i}][-1]:${array_for_buffer[i][array_for_buffer.length-1]}`);
            array_for_buffer[i].length--;
            console.log(`af::array_for_buffer[${i}][-1]:${array_for_buffer[i][array_for_buffer.length-1]}`);
        }
    }

    return array_for_buffer;
}
