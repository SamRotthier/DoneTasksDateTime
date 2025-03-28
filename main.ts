import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

const doneRegexPattern = /\[x\]/i;
const openRegexPattern = /\[ \]/i;
const dayRegexPattern = /\d{4}-\d{2}-\d{2}/;
const dateRemovalPattern = / - \d{4}-\d{2}-\d{2}.*$/;

export default class MyPlugin extends Plugin {
	private lastProcessedContent: string = '';

	async onload() {
		this.registerEvent(
			this.app.workspace.on("editor-change", (editor: Editor) => {

				const currentContent = editor.getValue();

				if(currentContent !== this.lastProcessedContent){
					processDoneLines(editor, currentContent);

					this.lastProcessedContent = currentContent;
				}
			})
		);
	}
}


function processDoneLines(editor: Editor, content: string){
	const lines = content.split('\n');
	const updatedLines = lines.map( line => {
		if(doneRegexPattern.test(line) && !dayRegexPattern.test(line)){
			return line + formatDate(new Date());
		}else if(openRegexPattern.test(line) && dayRegexPattern.test(line)){
			return line.replace(dateRemovalPattern, '');
		}
		return line;
	});

	if(JSON.stringify(lines)!== JSON.stringify(updatedLines)){
		const updatedContent = updatedLines.join('\n');
		editor.setValue(updatedContent);
	}
  }

  function formatDate(date: Date): string {
	const yyyy = date.getFullYear();
	const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
	const dd = String(date.getDate()).padStart(2, '0');
	
	const hh = String(date.getHours()).padStart(2, '0');
	const min = String(date.getMinutes()).padStart(2, '0');
	//const ss = String(date.getSeconds()).padStart(2, '0');
	
	return ` - ${yyyy}-${mm}-${dd} ${hh}:${min}`; // Custom format //:${ss}
  }
