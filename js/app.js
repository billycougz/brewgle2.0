//
//Brewgle 2.0
//Billy Cougan
//December 2014
//

//Note: beer data files are in Brewgle 1.0 directory



//Global variables
var beerArray = [];
var searchArray = [];
var selectedArray = [];



//When the page loads, load the beers from beers.json and display them in a list
$(document).ready(function () {
	var url="../brewgle/data/beers.json";
	var beerCount = 0;
	var src = "";
	
	$.getJSON(url, function (response) {
		$.each(response, function (index, beer) {
			
			beerArray.push(beer);
			src = "../../brewgle/beer_img/" + beer.beerName + ".png";
			
			if(beer.beerName == "#9"){
				src = "../../brewgle/beer_img/9.png";
			}
			beerArray[beerCount]['img'] = new Image();
			beerArray[beerCount]['img'].src = src;
			
			beerCount += 1;
		});
		
		displayBeerList(beerArray);
		searchArray = beerArray;
		
	}); //end getJSON
}); //end ready




//Add all beers relevent to search to searchArray
var createSearchArray = function(){
	var searchValue = $("#searchbar").val();
	searchValue = searchValue.toLowerCase();
	
	var beerCount = 0;
	
	$(beerArray).each(function(index, beer){
		if(
			beer.beerName.toLowerCase().indexOf(searchValue) >= 0 || 
			beer.brewer.toLowerCase().indexOf(searchValue) >= 0 || 
			beer.style.toLowerCase().indexOf(searchValue) >= 0 || 
			textSearch == ""){
			
				searchArray.push(beer);
				beerCount += 1;
		}
	});
}




//Display beers list
var displayBeerList = function(arrayToDisplay){
	console.log("Display Beer List");
	
	$('#beerList').html('');
	var beerCount = 0;
	var beerItem = '';
	var column = '';
	
	$(arrayToDisplay).each(function(index, beer){
		if(beerCount == 0 || beerCount%20 == 0){
			console.log(beerCount);
			column = document.createElement("div");
			column.classList.add("col-md-3");
			$('#beerList').append(column);
		}
		
		beerItem = document.createElement("p");
		beerItem.classList.add("unselected"); 
		beerItem.innerText = (beerCount + 1) + '. ' + beer.beerName;
		$(beerItem).bind("click", selectBeer);
		column.appendChild(beerItem);
		var br = document.createElement("br");
		column.appendChild(br);

		beerCount += 1;
	});
}




//Select a beer
var selectBeer = function(){
	var beerItem = this;
	var detailList = $('#detailList');
	
	$(beerItem).removeClass("unselected")
    	beerItem.classList.add("selected");

    	addBeerDetails(beerItem);
	
	$(beerItem).unbind("click", selectBeer);
    	$(beerItem).bind("click", deselectBeer);
}




//Deselect a beer
var deselectBeer = function(){
	var beerItem = this;
	$(beerItem).removeClass("selected")
    	beerItem.classList.add("unselected");
    	
    	removeBeerDetails(beerItem);
    	
    	$(beerItem).unbind("click", deselectBeer);
    	$(beerItem).bind("click", selectBeer);
}




//addBeerDetails 
var addBeerDetails = function(beerItem){	
	var beerItem = $(beerItem).html();
	var beerName;
	var beerBrewer;
	var beerStyle;
	var beerAbv;
	var beerIbu;
	var beerImg;
	
	$.each(beerArray, function(index, beer){
		
		beerName = beer.beerName;
		beerBrewer = beer.brewer;
		beerStyle = beer.style;
		beerAbv = beer.abv;
		beerIbu = beer.ibu;
		beerImg =  beer['img'].src;

		if(beerItem.indexOf(beer.beerName) > -1){
			
			var beerDetails = '<a rel="lightbox[group]" href="' + beerImg + '"><div class="beerDetailDiv col-md-6" style="display: "><div class="col-md-1"><img alt="' + beerName + '" style="height: 50px" src="' + beerImg + '"></div><div class="col-md-11"><label>' +
			beerName + ', ' + beerBrewer + '</label>' + 
			'<p>' + beerStyle + ', ' + beerAbv + '% ABV, ' + beerIbu + ' IBU</p></div></div></a>';

			selectedArray.push({
				beerName: beerName,
				beerDetails: beerDetails
			});
		}
	});
	
	console.log(selectedArray);
}


//removeBeerDetails 
var removeBeerDetails = function(beerItem){

	var beerItem = $(beerItem).html();

	selectedArray = selectedArray.filter(function( obj ) {
	    return beerItem.indexOf(obj.beerName) < 0;
	    //return obj.beerName !== beerItem;
	});
}



//Filter beers by search criteron
var filterBeers = function(){
	var searchText = $('#searchBar').val();
	searchText = searchText.toLowerCase();
	searchArray = [];
		
	$(beerArray).each(function(index, beer){
		if(beer.beerName.toLowerCase().indexOf(searchText) >= 0 || 
			beer.brewer.toLowerCase().indexOf(searchText) >= 0 || 
			beer.style.toLowerCase().indexOf(searchText) >= 0 || 
			searchText == ""){
				searchArray.push(beer);
	}});
}


$(document).ready(function () {
	$("body").on("keyup", "#searchBar", function(){
	
	selectedArray = [];
	filterBeers();
	displayBeerList(searchArray);
	
	}).trigger( "keyup" );
}); //end ready	
	
	
	
	
	
$(document).ready(function () {
	$("body").on("click", "#detailTab", function(){
	
		$(detailList).html('');
	
		$.each(selectedArray, function(index, beer){
			$(beer.beerDetails).appendTo(detailList);
		});
		
	 $("[rel^='lightbox']").prettyPhoto({
			social_tools: false,
			markup: '<div class="pp_pic_holder"> \
						<div class="ppt">&nbsp;</div> \
						<div class="pp_top"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
						<div class="pp_content_container"> \
							<div class="pp_left"> \
							<div class="pp_right"> \
								<div class="pp_content"> \
									<div class="pp_loaderIcon"></div> \
									<div class="pp_fade"> \
										<a href="#" class="pp_expand" title="Expand the image">Expand</a> \
										<div class="pp_hoverContainer"> \
											<a class="pp_next" href="#">next</a> \
											<a class="pp_previous" href="#">previous</a> \
										</div> \
										<div id="pp_full_res"></div> \
										<div class="pp_details"> \
											<div class="pp_nav"> \
												<a href="#" class="pp_arrow_previous">Previous</a> \
												<p class="currentTextHolder">0/0</p> \
												<a href="#" class="pp_arrow_next">Next</a> \
											</div> \
											<p class="pp_description"></p> \
											{pp_social} \
											<a class="pp_close" href="#">Close</a> \
										</div> \
									</div> \
								</div> \
							</div> \
							</div> \
						</div> \
						<div class="pp_bottom"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
					</div> \
					<div class="pp_overlay"></div>'
		});
		  
	}).trigger( "click" );
}); //end ready	
	
	
	
	
	

//When the sort combo is changed
$(document).ready(function () {
	$("body").on("change", "#sortSelect", function(){

		searchArray.sort(compare);
		
		selectedArray = [];
		
		$(searchArray).each(function(index, beer){
			if(beer.ibu < 10){
				beer.ibu.replace(/^0+/, '');
			};
		});
		
		displayBeerList(searchArray);

	}).trigger( "change" );
}); //end ready



	
//Function called for sorting
function compare(a,b) {

	var tempA = 0;
	var tempB = 0;
	
	//Function restores original values for those altered
	function tempRestore(){
		if(tempA != 0){
			a.ibu = tempA;
		}
		if(tempB != 0){
			b.ibu = tempB;
		}
	}//end tempRestore function
	

	if($("#sortSelect").val() == 'name'){
		if (a.beerName< b.beerName)
			return -1;
		if (a.beerName> b.beerName)
			return 1;
	}
	
	if($("#sortSelect").val() == 'abv'){
		if (a.abv < b.abv)
			return 1;
		if (a.abv > b.abv)
			return -1;
	}
	
	if($("#sortSelect").val() == 'ibu'){

		//----------------------------------------------------Deals with   1.(sorting numbers 100 < x < 10)   and   2.(N/A values)
		if(a.ibu > 99 ){tempA = a.ibu; a.ibu = 9 + a.ibu;}
		if(b.ibu > 99 ){tempB = b.ibu; b.ibu = 9 + b.ibu;}
		
		if(a.ibu < 10 || a.ibu == 'N/A'){
			tempA = a.ibu;
			a.ibu = 0 + a.ibu;
			
			if(a.ibu == '0N/A'){a.ibu = 0 + a.ibu;}
		}
		
		if(b.ibu < 10 || b.ibu == 'N/A'){
			tempB = b.ibu;
			b.ibu = 0 + b.ibu;
			
			if(b.ibu == '0N/A'){b.ibu = 0 + b.ibu;}
		}
		
		//------------------------------------------------------------------------------------------------------------
		
		if (a.ibu < b.ibu){
			tempRestore();
			return 1;
		}
		
		if (a.ibu > b.ibu){
			tempRestore();
			return -1;
		}
	}

	tempRestore();
	return 0;
}





$(document).ready(function () {
	$("body").on("click", "#selectAll", function(){

		$('.unselected').each(selectBeer);
		
	}).trigger( "click" );
}); //end ready	


$(document).ready(function () {
	$("body").on("click", "#deselectAll", function(){

		$('.selected').each(deselectBeer);
		
	}).trigger( "click" );
}); //end ready	


$(document).ready(function () {
	$("body").on("mouseenter", ".beerDetailDiv", function(){
		
		$(this).css('box-shadow', '5px 5px 5px 5px #888');
		}).on("mouseleave", ".beerDetailDiv", function(){
		$(this).css('box-shadow', 'none');
		
		//$('img', this).height('100');
		//}).on("mouseleave", ".beerDetailDiv", function(){
		//$('img').height('50');
	}).trigger( "mouseenter" );
}); //end ready	