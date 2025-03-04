self.onmessage = async (event) => {
	const imagesPath = import.meta.glob([
		"/src/lib/svg_files/MainPage/*.svg",
		"/src/lib/compressed_images/*.avif",
		"/src/lib/svg_files/Portfolio/Portfolio_LargeWorks/TFW_Project/*.png",
		"/src/lib/svg_files/Portfolio/Portfolio_LargeWorks/Endimo_Project/*.png",
		"/src/lib/svg_files/Portfolio/Portfolio_LargeWorks/*.png",
		"/src/lib/svg_files/Portfolio/Portfolio_LargeWorks/Compressed_Banners/*.png",
		"/src/lib/svg_files/Portfolio/Portfolio_Works/*.svg"
	])
	const names = event.data;
	// let loadedImages = {};
  
	for (const key in names) {
	  const currentName = names[key];
	  const currentPath_ImagesAvif = `/src/lib/compressed_images/${currentName}.avif`;
	  const currentPath_SVGs = `/src/lib/svg_files/MainPage/${currentName}.svg`;
	//   const currentPath_ImagesAvif = `/src/lib/${base[0]}${currentName}.${types[0]}`;
	//   const currentPath_SVGs = `/src/lib/${base[1]}${currentName}.${types[1]}`;
	//   const currentPath_PNGs = `/src/lib/${base[2]}${currentName}.${types[2]}`;
  
	  let module
	  let needDecoding = false

	  if (imagesPath[currentPath_ImagesAvif]) {
		module = await imagesPath[currentPath_ImagesAvif]();
		needDecoding = true
		// const response = await fetch(module.default);
		// const blob = await response.blob();
		// const objectURL = URL.createObjectURL(blob);
		// loadedImages[currentName] = objectURL;
	  }
	//   if (imagesPath[currentPath_PNGs]) {
	// 	module = await imagesPath[currentPath_PNGs]();
	// 	needDecoding = true
	//   }
	  if (imagesPath[currentPath_SVGs]) {
		module = await imagesPath[currentPath_SVGs]();
	  }
	  if (module) {
		self.postMessage({name: currentName, path: module.default, decode: needDecoding});
	  } 
	}
	// self.postMessage(loadedImages);
  };
  