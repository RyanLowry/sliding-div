class SlidingDiv{
	//TODO:add settings and logic for horizontal movement
	//TODO:Add ability to easily change settings
	constructor(parent){
		this.parent = parent
		this.children = parent.children
		this.currSelected = null;
		this.neighborChild = null;
		this.setSettings()

	}
	apply(){
		this.applyChildrenCss();
		this.addEvents();
	}
	setSettings(){
		this.settings = {
			borderStyle:"solid black 5px",
			borderOffset:10,
			positionOffset:50,
			
			//Keep these two the same
			position:"absolute",
			overflow:"hidden",
		}
	}

	applyChildrenCss(){
		//TODO:properly handle height, currently doesn't cut off properly at bottom
		for(let i = 0; i < this.children.length - 1; i++){
			this.children[i].style.width = ((i + 1) * this.settings.positionOffset) + "px";
			this.children[i].style.zIndex = this.children.length - i;
			this.children[i].style.overflow = this.settings.overflow;
			this.children[i].style.borderRight = this.settings.borderStyle;
			this.children[i].style.position = this.settings.position;
			console.log(i)
			
		}
	}
	addEvents(){
		this.parent.addEventListener('mousedown',e => {
			for(let i = 0; i < this.children.length - 1; i++){
				if(e.clientX > this.children[i].clientWidth && e.clientX < this.children[i].clientWidth + this.settings.borderOffset){
					this.currSelected = this.children[i]
					this.neighborChild = this.children[i + 1]
				}
			}
		});
		//TODO:prevent from moving past parent width.
		this.parent.addEventListener('mousemove',e => {
			
			if(this.currSelected != null){
				let bound = this.neighborChild.getBoundingClientRect()
				let bound2 = this.currSelected.getBoundingClientRect()
				this.currSelected.style.width = e.clientX + "px"
				if(bound2.width > bound.width){
					this.neighborChild.style.width = bound2.width + "px"
				}
			}
		});
		this.parent.addEventListener('mouseup',e => {
			this.currSelected = null
		});
		this.parent.addEventListener('selectstart',e=>{
			e.preventDefault();
		});
	}
}