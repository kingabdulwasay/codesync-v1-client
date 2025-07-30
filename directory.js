document.addEventListener('DOMContentLoaded', () => {
    const codebase = {}
    const folderInput = document.getElementById('folderInput')
    folderInput.addEventListener('change', (event) => {
        const files = event.target.files
        for (let i = 0; i < files.length; i++) {
            let current = codebase
            const paths = files[i].webkitRelativePath.split('/');
            for (let j = 0; j < paths.length; j++) {
                const path = paths[j]
                if (j === paths.length - 1) {
                    current[path] = ''
                } else {
                    if (!current[path]) {
                        current[path] = {}
                    }
                    current = current[path]
                }
            }
        }
        console.log(codebase)
        listFiles(codebase)
    })
    let parent = null
    function listFiles(obj) {
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === "object" && value !== null) {
                console.log("NESTED OBJECT FOUND IN " + key)
                const folder = document.createElement('div')
                const item = document.createElement('ul')
                item.innerHTML = `<i class="fa-regular fa-folder"></i>${key}`
             folder.appendChild(item)
                document.getElementById('file-tree').appendChild(folder)
                parent = item
                listFiles(value)
            } else {
                
                const file = document.createElement('li')
                file.innerHTML = `<i class="fa-regular fa-file"></i>${key}`
                parent.appendChild(file)
            }
        }
    }

})