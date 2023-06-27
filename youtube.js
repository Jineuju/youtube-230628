// const key = "AIzaSyCLX7TcNf7go_bvebanyXxRk3xKJTfLxjk"; // 오류
// const list = "PLXh5aUHaYhHk-cXl-QMhCU18pcmHlEpzS";
// const num = 4;
// let main = document.querySelector("main");

// const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${list}&maxResults=${num}`;

// fetch(url)
//   .then((data) => {
//     return data.json();
//   })
//   .then((json) => {
//     console.log(json);
//     let items = json.items;

//     let result = "";

//     items.map((el) => {
//       result += `
//         <article>
//             <img src="${el.snippet.thumbnails.medium.url}">
//             <h1>${el.snippet.title}</h1>
//         </article>
//         `;
//     });
//     main.innerHTML = result;
//   });

let vidList = document.querySelector(".vidList");
let key = "AIzaSyCLX7TcNf7go_bvebanyXxRk3xKJTfLxjk";
let playlistId = "PLXh5aUHaYhHk-cXl-QMhCU18pcmHlEpzS";
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}`;

fetch(url)
  .then((data) => {
    // console.log(data);
    return data.json();
  })
  .then((json) => {
    let items = json.items;
    // console.log(items);
    let result = "";

    items.map((el) => {
      let title = el.snippet.title;
      if (title.length > 20) {
        title = title.substr(0, 20) + "...";
        // text-overflow: ellipsis;와 똑같음
      }
      let des = el.snippet.description;
      if (des.length > 100) {
        des = des.substr(0, 100) + "...";
      }
      let date = el.snippet.publishedAt;
      date = date.split("T")[0];
      // split은 (구분한문자)를 기준으로 분할해서 배열로 반환합니다
      // 반환된 배열에서 [2020.05.01, 949324242] 필요한 0번째만 가져옵니다
      result += `
      <article>
        <a href="${el.snippet.resourceId.videoId}" class="pic">
          <img src="${el.snippet.thumbnails.standard.url}">
        </a>
        <div class="con">
            <h2>${title}</h2>
            <p>${des}</p>
            <span>${date}</span>
       </div>
       </article>
      `;
    });
    vidList.innerHTML = result;
  });
// 영상 사진 크기에 따라 넣어야해서 가장 기본적인 standard를 추천

// a태그인 썸네일을 클릭하면 비디오가 팝업되서 보이게 //
vidList.addEventListener("click", (e) => {
  // 리얼돔에 작성된 vidList에 이벤트 위임을 걸어서
  // 동적으로 생성된 요소들에게도 이벤트가 전달될 수 있도록 함

  e.preventDefault();

  // 이벤트위임의 단점인 이벤트 범위가 커져서 부작용이
  // 발생하는데 해결방안으로
  // 이벤트 발생의 목표가 아니라면 return으로 방지하도록 함

  if (!e.target.closest("a")) return;

  const vidId = e.target
    .closest("article")
    .querySelector("a")
    .getAttribute("href");
  // console.log(vidId);

  let pop = document.createElement("figure");
  pop.classList.add("pop");

  pop.innerHTML = `
    <iframe src="https://www.youtube.com/embed/${vidId}
    " frameborder="0" width="100%" height="100%"
    allowfullscreen></iframe>
    <span class="btnClose">close</span>
  `;

  vidList.append(pop);
});

// 팝업창의 close를 누르면 닫히게 //
// 이벤트위임을 통해서 닫기를 구현
// 이유는 닫기 버튼은 미래시에 있는 버튼이기때문에
// 이벤트 위임으로만 해결할 수 있어요

vidList.addEventListener("click", (e) => {
  const pop = vidList.querySelector(".pop");
  // pop이 존재하면 if문 안으로 들어가고
  // pop이 존재하지 않으면 무시되어 적용 X
  if (pop) {
    const close = pop.querySelector(".btnClose");
    // 위의 이벤트와 이 이벤트가 충돌되는 상황입니다
    // 위에서는 pop을 만들고 이 이벤트는 pop을 지우는 이벤트이니 충돌
    if (e.target == close) pop.remove();
  }
});
