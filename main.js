`use strict`;

{

  // チェックボタン押下の処理
  document.querySelector('#checkButton').addEventListener('click', () => {
    const inputText = document.querySelector('#input').value;
    const outputText = document.querySelector('#output');
    const chuukiText = document.querySelector('#chuuki');
    const criteriaInputRed = document.querySelector('#criteriaRed').value;
    const criteriaInputYellow = document.querySelector('#criteriaYellow').value;
    const criteriaInputBlue = document.querySelector('#criteriaBlue').value;
    outputText.textContent = "";
    chuukiText.textContent = "";
    let countRed, countYellow, countBlue = {};

    const allList = document.getElementById("criteriaList");
    const yellowList = document.getElementById("criteriaYellowList");
    allList.textContent = "";
    yellowList.textContent = "";

    //検索ワードの取得
    const criteriaTextRed = criteriaInputRed.match(/\S+/g);
    const criteriaTextYellow = criteriaInputYellow.match(/\S+/g);
    const criteriaTextBlue = criteriaInputBlue.match(/\S+/g);

    let redMax = 0;
    let blueMax = 0;

    if (criteriaTextRed) {
      redMax = criteriaTextRed.length;
    }

    if (criteriaTextBlue) {
      blueMax = criteriaTextBlue.length;
    }

    const criteriaMax = Math.max(redMax, blueMax);
    const redPlus = new Array(criteriaMax - redMax);
    const bluePlus = new Array(criteriaMax - blueMax);

    let criteriaTextRed2 = new Array(criteriaMax);
    let criteriaTextBlue2 = new Array(criteriaMax);

    if (criteriaTextRed) {
      criteriaTextRed2 = criteriaTextRed.concat(redPlus);
    }

    if (criteriaTextBlue) {
      criteriaTextBlue2 = criteriaTextBlue.concat(bluePlus);
    }

    countRed = new Array(criteriaMax);
    countRed.fill(0);
    countBlue = new Array(criteriaMax);
    countBlue.fill(0);

    if (criteriaTextYellow) {
      countYellow = new Array(criteriaTextYellow.length);
      countYellow.fill(0);
    }

    //テキストとの照合
    for (let i = 0; i < inputText.length; i++) {
      let c = inputText.substring(i, i + 1);
      let klass = [];
      let checked = "";

      //改行処理
      if (c === "\n") {
        outputText.insertAdjacentHTML('beforeend', '<br>');
        continue;
      }

      //色付け
      if (criteriaTextRed) {
        criteriaTextRed.forEach((value, index) => {
          if (inputText.startsWith(value, i) && checked === "") {
            c = value;
            i = i + value.length - 1;
            klass.push("akaami");
            checked = "check";
            let checkit = countRed.at(index);
            countRed.fill(checkit + 1, index, index + 1);
          }
        });
      }

      if (criteriaTextBlue) {
        criteriaTextBlue.forEach((value, index) => {
          if (inputText.startsWith(value, i) && checked === "") {
            c = value;
            i = i + value.length - 1;
            klass.push("aoami");
            checked = "check";
            let checkit = countBlue.at(index);
            countBlue.fill(checkit + 1, index, index + 1);
          }
        });
      }

      if (criteriaTextYellow) {
        criteriaTextYellow.forEach((value, index) => {
          if (inputText.startsWith(value, i) && checked === "") {
            c = value;
            i = i + value.length - 1;
            klass.push("kiami");
            checked = "check";
            let checkit = countYellow.at(index);
            countYellow.fill(checkit + 1, index, index + 1);
          }
        });
      }

      let spanElement = document.createElement("span");
      spanElement.textContent = c;
      spanElement.className = klass;
      outputText.appendChild(spanElement);
    }  // ループ終わり


    //表を入れる
    //  const allList = document.getElementById("criteriaList")[0];
    const allTable = document.createElement("table");
    const alltbody = document.createElement("tbody");
    const alltr = document.createElement("tr"); 
    const alltd5 = document.createElement("td"); 
    const alltd1 = document.createElement("td"); 
    const alltd2 = document.createElement("td");
    const alltd3 = document.createElement("td");
    const alltd4 = document.createElement("td");

    alltd1.textContent = "No.";
    alltd2.textContent = "修正検討ワード";
    alltd3.textContent = "出現数";
    alltd4.textContent = "表記揃えワード";
    alltd5.textContent = "出現数";


    alltr.appendChild(alltd1);
    alltr.appendChild(alltd2);
    alltr.appendChild(alltd3);
    alltr.appendChild(alltd4);
    alltr.appendChild(alltd5);

    alltbody.appendChild(alltr);
    allTable.appendChild(alltbody);
    allList.appendChild(allTable);


    //2行目以降を入れる
    for (let i = 0; i < criteriaMax; i++) {

      if (countRed.at(i) + countBlue.at(i) > 0) {
        const row = document.createElement("tr");

        //第1列
        const cell = document.createElement("td");
        const cellText1 = document.createElement("td");
        const cellText2 = document.createElement("td");
        const cellText3 = document.createElement("td");
        const cellText4 = document.createElement("td");

        cell.textContent = i + 1;
        row.appendChild(cell);

        //第2列
        cellText1.innerHTML = criteriaTextRed2.at(i);
        row.appendChild(cellText1);

        //第3列
        cellText2.innerHTML = countRed.at(i);
        row.appendChild(cellText2);

        //第4列
        cellText3.innerHTML = criteriaTextBlue2.at(i);
        row.appendChild(cellText3);

        //第5列
        cellText4.innerHTML = countBlue.at(i);

        row.appendChild(cellText4);
        alltbody.appendChild(row);
        allTable.appendChild(alltbody);
        allList.appendChild(allTable);

      }
    }

    //黄色ワードの表を入れる
    const yellowTable = document.createElement("table");
    const yellowtbody = document.createElement("tbody");
    const yellowtr = document.createElement("tr"); //tr=table row　表の行
    const yellowtd1 = document.createElement("td"); //td=tabel data　表の内容
    const yellowtd2 = document.createElement("td");
    const yellowtd3 = document.createElement("td");

    yellowtd1.textContent = "No.";
    yellowtd2.textContent = "要検討ワード";
    yellowtd3.textContent = "出現数";

    yellowtr.appendChild(yellowtd1);
    yellowtr.appendChild(yellowtd2);
    yellowtr.appendChild(yellowtd3);

    yellowtbody.appendChild(yellowtr);
    yellowTable.appendChild(yellowtbody);
    yellowList.appendChild(yellowTable);

    //2行目以降を入れる
    if (criteriaInputYellow) {

      for (let i = 0; i < criteriaTextYellow.length; i++) {

        if (countYellow.at(i) > 0) {

          const row = document.createElement("tr");

          //第1列
          const cell = document.createElement("td");
          const cellText1 = document.createElement("td");
          const cellText2 = document.createElement("td");
          // const cellText3 = document.createElement("td");

          cell.textContent = i + 1;
          row.appendChild(cell);

          //第2列
          cellText1.innerHTML = criteriaTextYellow.at(i);
          row.appendChild(cellText1);

          //第3列
          cellText2.innerHTML = countYellow.at(i);
          row.appendChild(cellText2);

          // row.appendChild(cellText4);
          yellowtbody.appendChild(row);
          yellowTable.appendChild(yellowtbody);
          yellowList.appendChild(yellowTable);

        }
      }
    }
  });


  // テキストクリアボタン押下の処理
  document.querySelector('#clearButton').addEventListener('click', () => {
    const outputText = document.querySelector('#output');
    const chuukiText = document.querySelector('#chuuki');
    document.getElementById('input').value = '';
    document.getElementById('input').focus();
    outputText.textContent = "";
    chuukiText.textContent = "";
    const allList = document.getElementById("criteriaList");
    allList.textContent = "";
    const yellowList = document.getElementById("criteriaYellowList");
    yellowList.textContent = "";
  });


  // 検索ワードクリアボタン押下の処理
  document.querySelector('#clearCriteriaButton').addEventListener('click', () => {
    const fileContentList = document.querySelector('pre');
    fileContentList.textContent = "";

    const criteriaInputRed = document.getElementById('criteriaRed');
    criteriaInputRed.value = "";

    const criteriaInputBlue = document.getElementById('criteriaBlue');
    criteriaInputBlue.value = "";

    const criteriaInputYellow = document.getElementById('criteriaYellow');
    criteriaInputYellow.value = "";
    
  });

  //検索ワードの保存
  document.querySelector('#saveCriteriaButton').addEventListener('click', () => {
    const criteriaInputRed = document.querySelector('#criteriaRed').value;
    const criteriaInputYellow = document.querySelector('#criteriaYellow').value;
    const criteriaInputBlue = document.querySelector('#criteriaBlue').value;
    const text = '●赤字:' + criteriaInputRed + '\n●青字:' + criteriaInputBlue + '\n●黄色字:' + criteriaInputYellow;
    const blob = new Blob([text], { type: "text/plain" });

    // const fileName = prompt("ファイル名を入力してください","表記チェッカー検索ワード.txt");
    //  if(fileName){
    //   const a = document.createElement("a");
    //   a.href = URL.createObjectURL(blob);
    //   a.download = fileName;
    //   document.body.appendChild(a);
    //   a.click();
    //   document.body.removeChild(a);
    //   URL.revokeObjectURL(a.href);
    //  }


    //ファイル選択ダイアログを表示
    // const fileInput = document.createElement('input');
    // fileInput.type = 'file';
    // fileInput.style.display = 'none';
    // fileInput.accept = '.txt';

    // fileInput.addEventListener('change', (event) => {
    //   const fileName = event.target.files[0].name;
    //   const a = document.createElement("a");
    //   a.href = URL.createObjectURL(blob);
    //   a.download = fileName;

    //   document.body.appendChild(a);
    //   a.click();
    //   document.body.removeChild(a);
    //   URL.revokeObjectURL(a.href);
    // })
    // fileInput.click();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "表記チェッカー検索ワード.txt";
    a.click();
    URL.revokeObjectURL(url);
  });

  //検索ワードの読み込み
  const fileInput = document.getElementById('fileInput');
  const fileContent = document.getElementById('fileContent');
  let newCriteria = "";

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file.type === "text/plain") {
      if (file.size < 30000) {
        reader.onload = () => {
          fileContent.textContent = reader.result;
          newCriteria = fileContent.textContent;
          yomikomi(newCriteria);
        };
        reader.readAsText(file);
      } else { alert("ファイルが大きすぎます。30KB以下に抑えてください"); }
    } else { alert("テキストファイルではありません"); }
  }, false)

  //検索ワード読み込み関数
  function yomikomi(newCriteria){
    const critNew = newCriteria.match(/:.*/g);
    let criteriaInputRed = document.querySelector('#criteriaRed');
    let criteriaInputBlue = document.querySelector('#criteriaBlue');
    let criteriaInputYellow = document.querySelector('#criteriaYellow');

    criteriaInputRed.value = "";
    criteriaInputBlue.value = "";
    criteriaInputYellow.value = "";

    criteriaInputRed.value = critNew[0].slice(1);
    criteriaInputBlue.value = critNew[1].slice(1);
    criteriaInputYellow.value = critNew[2].slice(1);
  }

}