import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';



const doneRegexPattern= /\[x\]/i;
const remainingLines = [];
const completedTodos = [];

export default class MyPlugin extends Plugin {

	async onload() {

			this.app.workspace.on("editor-change", (e) =>{
					const lines = e.getDoc().getValue().split('\n');
					console.log(lines)
					let i = 1;
					lines.forEach(line => {
						if (doneRegexPattern.test(line)) {
							let now = new Date()
							  console.log(line.concat(formatDate(now)))
							  //line = line.concat(formatDate(now));
							//if (i<3) e.replaceSelection(line);
							
							i++
						} 
					  });
		})

		//const test = this.app.workspace.getActiveViewOfType(MarkdownView)
		//test?.editor.
	}
}

function formatDate(date: Date): string {
	const yyyy = date.getFullYear();
	const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
	const dd = String(date.getDate()).padStart(2, '0');
	
	const hh = String(date.getHours()).padStart(2, '0');
	const min = String(date.getMinutes()).padStart(2, '0');
	const ss = String(date.getSeconds()).padStart(2, '0');
	
	return ` - ${yyyy}-${mm}-${dd}`; // Custom format ${hh}-${min}-${ss}
  }