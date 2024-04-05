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

    //検索ワードの取得
    const criteriaTextRed = criteriaInputRed.match(/\S+/g);
    const criteriaTextYellow = criteriaInputYellow.match(/\S+/g);
    const criteriaTextBlue = criteriaInputBlue.match(/\S+/g);
    // console.log("検索ワード 赤＝", criteriaTextRed, "黄＝", criteriaTextYellow, "青＝", criteriaTextBlue);

    //テキストとの照合
    for (let i = 0; i < inputText.length; i++) {
      let c = inputText.substring(i, i + 1);
      let d = inputText.substring(i + 1, i + 2);
      let klass = [];
      let checked = "";

      //改行処理
      if (c === "\n") {
        if (d !== "\n") {
          outputText.insertAdjacentHTML('beforeend', '<br>');
        }
        continue;
      }

      //色付け
      if (criteriaTextRed) {
        criteriaTextRed.forEach(function (value) {
          if (inputText.startsWith(value, i) && checked === "") {
            c = value;
            i = i + value.length - 1;
            klass.push("akaami");
            checked = "check";
          }
        });
      }

      // console.log("ここにconsole.logを入れると止まる");

      if (criteriaTextYellow) {
        criteriaTextYellow.forEach(function (value) {
          if (inputText.startsWith(value, i) && checked === "") {
            c = value;
            i = i + value.length - 1;
            klass.push("kiami");
            checked = "check";
          }
        });
      }

      if (criteriaTextBlue) {
        criteriaTextBlue.forEach(function (value) {
          if (inputText.startsWith(value, i) && checked === "") {
            c = value;
            i = i + value.length - 1;
            klass.push("aoami");
            checked = "check";
          }
        });
      }

      let spanElement = document.createElement("span");
      spanElement.textContent = c;
      spanElement.className = klass;
      outputText.appendChild(spanElement);
    }
    // ループ終わり

    // console.log("outputText", outputText);
  });


  //注記を入れる
  // if (bushu > 0) {
  //   chuukiText.insertAdjacentHTML('afterbegin', "【注意】テキストの中に漢字の部首の文字コードが" + bushu + "字混じっています。確認してください。<hr>");
  // }

  // テキストクリアボタン押下の処理
  document.querySelector('#clearButton').addEventListener('click', () => {
    const outputText = document.querySelector('#output');
    const chuukiText = document.querySelector('#chuuki');
    document.getElementById('input').value = '';
    document.getElementById('input').focus();
    outputText.textContent = "";
    chuukiText.textContent = "";
  });


  // 検索ワードクリアボタン押下の処理
  document.querySelector('#clearCriteriaButton').addEventListener('click', () => {
    const criteriaInputRed = document.querySelector('#criteriaRed');
    const criteriaInputYellow = document.querySelector('#criteriaYellow');
    const criteriaInputBlue = document.querySelector('#criteriaBlue');

    document.getElementById('criteriaRed').value = '';
    criteriaInputRed.textContent = "";
    document.getElementById('criteriaYellow').value = '';
    criteriaInputYellow.textContent = "";
    document.getElementById('criteriaBlue').value = '';
    criteriaInputBlue.textContent = "";
  });

}