    const runBtn = document.getElementById('run-code');
    const editorContainer = document.getElementById('editor-container');
    const iframeContainer = document.getElementById('iframe-container');

    let html = ''
    let css = ''
    let js = ''

    document.addEventListener('DOMContentLoaded', async ()=>{
      const workspace = JSON.parse(localStorage.getItem('workspace'))
        const res = await fetch('https://codesync-server-production-0888.up.railway.app/files', {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({space:workspace.workspaceName})
        })
        const filesviaAPI = await res.json()
        if (res.ok) {           
            console.log(filesviaAPI)
             for (let index = 0; index < filesviaAPI.length; index++) {
                if (filesviaAPI[index] != null) {
                    if(filesviaAPI[index].file.endsWith('.html')){
                      html = filesviaAPI[index].code
                    }else if(filesviaAPI[index].file.endsWith('.css')){
                      css = filesviaAPI[index].code
                    }else if(filesviaAPI[index].file.endsWith('.js')){
                      js = filesviaAPI[index].code
                    }
                }
            }
        
    }

        
      editorContainer.style.display = 'none';
      iframeContainer.style.display = 'block';

      const iframe = document.getElementById('run-iframe');
      iframe.srcdoc = `
  <html>
    <head>
      <style>
          ${css}
      </style>
    </head>
    <body>
      ${html}
       <script>
      ${js}
    </script>
    </body>
  </html>
`
      
    })
    runBtn.onclick = () => {
  
        window.location.replace('https://codesync-server-production-0888.up.railway.app/client/index.html')
    };