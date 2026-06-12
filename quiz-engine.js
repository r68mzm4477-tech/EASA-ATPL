
window.ATPLQuiz = function(containerId, questions){
  const root = document.getElementById(containerId);
  if(!root) return;

  let current = 0;
  let score = 0;

  function render(){
    const q = questions[current];

    root.innerHTML = `
      <div style="background:#fff;border:1px solid #D0D8DE;border-radius:6px;padding:16px;margin-top:16px;">
        <div style="font:700 12px monospace;color:#607080;margin-bottom:8px;">
          QUESTION ${current + 1} / ${questions.length}
        </div>

        <div style="font:700 18px sans-serif;margin-bottom:16px;">
          ${q.question}
        </div>

        ${q.answers.map((a,i)=>`
          <button class="quizbtn" data-i="${i}"
            style="display:block;width:100%;text-align:left;padding:12px;margin-bottom:10px;
            border:1px solid #D0D8DE;border-radius:6px;background:#fff;cursor:pointer;">
            ${a}
          </button>
        `).join("")}
      </div>
    `;

    document.querySelectorAll(".quizbtn").forEach(btn=>{
      btn.onclick = function(){
        const selected = parseInt(this.dataset.i);

        if(selected === q.correct){
          score++;
          this.style.border = "2px solid green";
        } else {
          this.style.border = "2px solid red";
        }

        setTimeout(()=>{
          current++;
          if(current >= questions.length){
            root.innerHTML = `
              <div style="background:#16222C;color:#fff;padding:18px;border-radius:6px;margin-top:16px;">
                <div style="font:700 24px sans-serif;">Quiz Complete</div>
                <div style="margin-top:8px;font:600 16px sans-serif;">
                  Score: ${score} / ${questions.length}
                </div>
              </div>
            `;
          } else {
            render();
          }
        }, 700);
      };
    });
  }

  render();
}
