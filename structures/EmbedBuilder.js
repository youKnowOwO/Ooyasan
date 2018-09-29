class EmbedBuilder {
	constructor(data = {}) {
		Object.assign(this, data);
		this.fields = data.fields || [];
	}
	
	setAuthor(name, icon, url) {
		this.author = { name, icon_url: icon, url };
		return this;
	}
	
	setColor(color){
		this.color = color;
		return this;
	}
	
	setDescription(desc) {
		this.description = desc.toString().substring(0, 2048);
		return this;
	}
	
	addField(name, value, inline = false){
		if(this.fields.length >= 25) return this;
		if(!name) throw RangeError('Field Name cannot empty');
		if(!value) throw RangeError('Field Value cannot empty');
		this.fields.push({ name: name.toString().substring(0, 256), value: value.toString().substring(0, 1024), inline });
		return this;
	}
	
	setFile(file){
		this.file = file;
		return this;
	}
	
	setFooter(text, icon){
		this.footer = { text: text.toString().substring(0, 2048), icon_url: icon };
		return this;
	}
	
	setImage(url){
		this.image = { url };
		return this;
	}
	
	setThumbnail(url){
		this.thumbnail = { url };
		return this;
	}
}

module.exports = EmbedBuilder;
