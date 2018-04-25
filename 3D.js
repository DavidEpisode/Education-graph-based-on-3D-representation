

			String.prototype.format = function () {

				var str = this;

				for ( var i = 0; i < arguments.length; i ++ ) {

					str = str.replace( '{' + i + '}', arguments[ i ] );

				}
				return str;

			};

			Graph = [
['AI(1960-1970)', 'AI(1970-1980)', '', 1.0],
['AI(1970-1980)', 'AI(1980-2010)', '', 1.0],
['AI(1980-2010)', 'AI(2010-)', '', 1.0],
['AI(1960-1970)', '逻辑理论家', '', 1.0],
// ['AI(1960-1970)', '通用问题求解', '泛化', 1.0],
// ['AI(1970-1980)', '专家系统', '泛化', 1.0],
// ['AI(1980-2010)', 'perceptron', '泛化', 1.0],
// ['perceptron', 'SVM', '顺承', 1.0],
// ['SVM', 'kernel SVM', '顺承', 1.0],
// ['AI(1980-2010)', 'ADALINE', '泛化', 1.0],
['AI(1980-2010)', 'ID3', '', 2.0],
['ID3', 'C4.5', '', 2.0],
['C4.5', 'RF', '', 2.0],
['AI(1980-2010)', 'AdaBoost', '', 2.0],
['弱可学习定理', 'AdaBoost', '', 2.0],
['AI(1980-2010)', 'MRF', '', 2.0],
// ['MRF', 'Gibbs Sampling', '共现', 2.0],
// ['Gibbs Sampling', 'MAP estimate', '共现', 2.0],
// ['MAP estimate', 'MRF', '共现', 2.0],
// ['MRF', 'CRF', '顺承', 2.0],
// ['CRF', 'DBN', '顺承', 2.0],
['Gibbs Sampling', 'Boltzmann machine', '', 3.0],
['Hopfield network', 'Boltzmann machine', '', 3.0],
['动态规划方法', 'ADP', '', 3.0],
['AI(1980-2010)', '动态规划方法', '', 3.0],
['动态规划方法', 'TD', '', 3.0],
['TD', 'Q-learning', ' ', 3.0],
// ['Monte Carlo method', 'TD', '因果', 3.0],
// ['Q-learning', 'Saras', '顺承', 3.0],
// ['Saras', 'NDP', '顺承', 3.0],
// ['NDP', 'UCT', '顺承', 3.0],
// ['UCT', 'PG', '顺承', 3.0],
// ['PG', 'DPG', '顺承', 3.0],
// ['DPG', 'DQN', '顺承', 4.0],
// ['AI(2010-)', 'DPG', '泛化', 4.0],
// ['AI(1980-2010)', 'AD', '泛化', 4.0],
// ['AD', 'BP', '顺承', 4.0],
// ['perceptron', '《Perceptron》', '顺承', 4.0],
// ['BP', 'universal approximation theorem', '顺承', 4.0],
// ['AI(1980-2010)', 'Hopfield network', '泛化', 4.0],
// ['Hopfield network', 'LSTM', '顺承', 4.0],
// ['LSTM', 'GRUs', '顺承', 4.0],
// ['AI(2010-)', 'LSTM', '泛化', 4.0],
// ['neocognitron', 'CNN', '顺承', 4.0],
// ['CNN', 'DQN', '顺承', 4.0],
// ['CNN', 'DBN', '顺承', 4.0],
// ['RBM', 'DBN', '顺承', 4.0],
// ['DBN', 'Xavier', '顺承', 4.0],
// ['Xavier', 'ReLu', '顺承', 4.0],
// ['ReLu', 'AlexNet', '顺承', 4.0],
// ['CUDA', 'AlexNet', '因果', 4.0],
// ['AlexNet', 'GoogLeNet', '顺承', 5.0],
// ['GoogLeNet', 'Batch Normalization', '顺承', 5.0],
// ['Batch Normalization', 'ResNet', '顺承', 5.0],
// ['AI(2010-)', 'CNN', '泛化', 5.0],
// ['AlexNet', 'R-CNN', '顺承', 5.0],
// ['R-CNN', 'Fast R-CNN', '顺承', 5.0],
// ['Fast R-CNN', 'Faster R-CNN', '顺承', 5.0],
// ['GANs', 'CGANs', '顺承', 5.0],
// ['GANs', 'LAPGAN', '顺承', 5.0],
// ['DRAW', 'LAPGAN', '顺承', 5.0],
// ['LSTM', 'GRAN', '顺承', 5.0],
// ['GANs', 'GRAN', '顺承', 5.0],
// ['GANs', 'DCGAN', '顺承', 5.0],
// ['f-GAN', 'InfoGAN', '顺承', 5.0],
// ['GANs', 'f-GAN', '顺承', 5.0],
// ['AI(2010-)', 'GANs', '泛化', 5.0],


			];

			var Position_single = [];
			//容器 监视器
			var container, stats;
			//相机 场景 渲染器
			var camera, scene, renderer;

			var splineHelperObjects = [], splineOutline;

			for ( var i = 0; i < Graph.length; i++ ) {
				splineHelperObjects[ i ] = [];
			}

			var splinePointsLength = 2;
			var positions = [];
			var Word = [];
			var Relation = [];
			var word_font = "fonts/SimHei_Regular.json";

			var geometry = new THREE.SphereGeometry( 20, 32, 32 )
			var transformControl;

			var ARC_SEGMENTS = 200;
			var splineMesh;

			var spline = [];

			var params = {
				uniform: true,
				tension: 0.5,
				showall: showall
				
			};
            
			var mydata;

			init();
			createText();
			animate();

			$(document).ready(function(){
			 	$("input").change(function(){ 
			 		mydata = document.getElementById("word").value;
			 		expandgraph( mydata );
			 	});
			});

			function init() {

				container = document.getElementById( 'container' );


				scene = new THREE.Scene();


				scene.background = new THREE.Color( 0x1E90FF );
				var light = new THREE.DirectionalLight( 0xffffff, 1 );
				light.position.set( 1, 1, 1 ).normalize();
				scene.add( light );



				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.set( 0, 0, 1000 );
				scene.add( camera );



				scene.add( new THREE.AmbientLight( 0xf0f0f0 ) );


				var light = new THREE.SpotLight( 0xffffff, 1.5 );
				light.position.set( 0, 1500, 200 );
				light.castShadow = true;
				light.shadow = new THREE.LightShadow( new THREE.PerspectiveCamera( 70, 1, 200, 2000 ) );
				light.shadow.bias = -0.000222;
				light.shadow.mapSize.width = 1024;
				light.shadow.mapSize.height = 1024;
				scene.add( light );


				spotlight = light;

				var planeGeometry = new THREE.PlaneGeometry( 2000, 2000 );
				planeGeometry.rotateX( - Math.PI / 2 );
				var planeMaterial = new THREE.ShadowMaterial( { opacity: 0.2 } );

				var plane = new THREE.Mesh( planeGeometry, planeMaterial );
				plane.position.y = -200;
				plane.receiveShadow = true;
				scene.add( plane );



				//网格辅助器
				// var helper = new THREE.GridHelper( 2000, 100 );
				// helper.position.y = - 199;
				// helper.material.opacity = 0.25;
				// helper.material.transparent = true;
				// scene.add( helper );


				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				width = document.getElementById('container').clientWidth;     //获取画布的宽
                height = document.getElementById('container').clientHeight;  
				renderer.setSize( width, height );
				renderer.shadowMap.enabled = true;
				container.appendChild( renderer.domElement );

                // renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
                // window.addEventListener( 'mousedown', onDocumentMouseDown, false );
                // document.addEventListener( 'mousedown', onDocumentMouseDown, false );


                // renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );


				// stats = new Stats();
				// container.appendChild( stats.dom );

				// 控制台
				var gui = new dat.GUI();

				gui.add( params, 'uniform' );
				gui.add( params, 'tension', 0, 1 ).step( 0.01 ).onChange( function( value ) {
					spline.uniform.tension = value;
					updateSplineOutline( );
				});
				gui.add( params, 'showall' );
				gui.open();

				// Controls
				var controls = new THREE.OrbitControls( camera, renderer.domElement );
				controls.damping = 0.2;
				controls.addEventListener( 'change', render );

				controls.addEventListener( 'start', function() {

					cancelHideTransorm();

				} );

				controls.addEventListener( 'end', function() {

					// delayHideTransform();

				} );

				transformControl = new THREE.TransformControls( camera, renderer.domElement );
				transformControl.addEventListener( 'change', render );
				scene.add( transformControl );



				// Hiding transform situation is a little in a mess :()
				transformControl.addEventListener( 'change', function( e ) {
					// hideTransform();
					cancelHideTransorm();


				} );

				transformControl.addEventListener( 'mouseDown', function( e ) {
					// hideTransform();
					cancelHideTransorm();


				} );

				transformControl.addEventListener( 'mouseUp', function( e ) {

					delayHideTransform();

				} );

				transformControl.addEventListener( 'objectChange', function( e ) {

					updateSplineOutline( );

				} );

				for ( var i = 0; i < Graph.length; i++){
					var dragcontrols = new THREE.DragControls( splineHelperObjects[ i ], camera, renderer.domElement ); //
					dragcontrols.enabled = false;
					dragcontrols.addEventListener( 'hoveron', function ( event ) {

						transformControl.attach( event.object );
						// hideTransform();
						cancelHideTransorm();

					} );

					dragcontrols.addEventListener( 'hoveroff', function ( event ) {

						delayHideTransform();

					} );
				}

				var hiding;

				function delayHideTransform() {

					cancelHideTransorm();
					hideTransform();

				}

				function hideTransform() {

					hiding = setTimeout( function() {

						transformControl.detach( transformControl.object );

					}, 250 )

				}

				function cancelHideTransorm() {

					if ( hiding ) clearTimeout( hiding );

				}


				/*******
				 * Curves
				 *********/
				vi = true;

				for ( var j = 0; j < Graph.length; j++ ){

					// splineHelperObjects.push( [] );
					positions = Graph[ j ]; //[公司， 产品 ，包含]
					if ( j > 0){
						vi = false;
					}
					relation = positions[2]; //[包含]
					for ( var k = 0; k < 2; k++) {
						 
						if ( not_contains( Position_single, positions[ k ] ) )  {
							// Position_single.push( positions[ k ] );
							cc = positions[3];
							switch( cc ){
								case 1.0:
									color_c = 0xFFFF00;
									break;
								case 2.0:
									color_c = 0xFF8C00;
									break;
								case 3.0:
									color_c = 0xFA8072;
									break;
								case 4.0:
									color_c = 0xDB7093;
									break;
								case 5.0:
									color_c = 0x98FB98;
									break;

							}
							var material = new THREE.MeshLambertMaterial( { color: color_c } );
							var object = new THREE.Mesh( geometry, material );


							object.position.x = Math.random() * 1000 - 500;
							object.position.y = Math.random() * 500;
							object.position.z = Math.random() * 800 - 400;

							
							object.castShadow = true;
							object.receiveShadow = true;
							object.name = positions[ k ];
							object.visible = vi;
							scene.add( object );
							// createEntity( positions[ k ], object.position );

							Position_single.push( object );
							splineHelperObjects[ j ].push( object );
						} else {
							splineHelperObjects[ j ].push( find( Position_single, positions[ k ] ) );
						}
						
					}

					var position = [];

					for ( var i = 0; i < splineHelperObjects[ j ].length; i ++ ) {

						position.push( splineHelperObjects[ j ][ i ].position );

					}

					var geometry_line = new THREE.Geometry();

					for ( var i = 0; i < ARC_SEGMENTS; i ++ ) {

						geometry_line.vertices.push( new THREE.Vector3() );

					}

					var curve = new THREE.CatmullRomCurve3( position ); //Position[ j ]
					curve.curveType = 'catmullrom';
					curve.mesh = new THREE.Line( geometry_line.clone(), new THREE.LineBasicMaterial( {
						color: 	0xDCDCDC,
						opacity: 0.35,
						linewidth: 10
						} ) );
					curve.mesh.castShadow = true;
					spline[ j ] = curve;
					spline[ j ].mesh.visible = vi;
					scene.add( spline[ j ].mesh );

				}
				updateSplineOutline( );


			}

			function find( Position ,position ) {
				var i = Position.length;
				while (i--) {
					if ( Position[ i ].name == position ) {
						return Position[ i ];
					}
				}
			}

			function not_contains( arr, position ) {  
			    var i = arr.length;  
			    while (i--) {  
			        if ( arr[i].name == position ) {  
			            return false;  
			        }
			    }  
			    return true;
  
			}  


			function updateSplineOutline( ) {

				for ( var j = 0; j < Graph.length; j++){
					splineMesh = spline[ j ].mesh;

					for ( var i = 0; i < ARC_SEGMENTS; i ++ ) {

						var p = splineMesh.geometry.vertices[ i ];
						var t = i /  ( ARC_SEGMENTS - 1 );
						spline[ j ].getPoint( t, p );

					}

					splineMesh.geometry.verticesNeedUpdate = true;
				}
			}



			function createText(){
				vi = false;
				var loader = new THREE.FontLoader();
				loader.load(word_font, function( font ){
					S_length = Position_single.length;
					while( S_length-- ){
						if ( S_length < 2 ){
							vi = true;
						}
						word = Position_single[ S_length ].name;
						position = Position_single[ S_length ].position;
						var geometry = new THREE.TextGeometry( word, {
							font: font,
							size: 20,
							height: 5, //文字的厚度
						    // weight: bold,
						    curveSegments: 12,
						    bevelEnabled: false,
						    bevelThickness: 10,
						    bevelSize: 8,
						    bevelSegments: 5
						});
						var material = new THREE.MeshPhongMaterial({
						    color: 0xffffff,
						    specular: 0x009900,
						    shininess: 30,
						    // shading: THREE.FlatShading
						});
						var textObj = new THREE.Mesh(geometry, material);
						textObj.castShadow = true;
						textObj.name = this.word;
						textObj.position.copy(position);
						textObj.position.y += 30;
						textObj.visible = vi;
						Word.push( textObj );

						scene.add( textObj );
					}
					G_length = Graph.length;
					vi = true;
					for ( var i = 0; i < G_length; i++){
						words = Graph[ i ];
						if ( i > 0){
							vi = false;
						}
						arr = splineHelperObjects[ i ];
						word = words[2];
						name = words[0] + words[1];
						var geometry = new THREE.TextGeometry( word , {
							font: font,
							size: 20,
							height: 2,
							// weight: bold,
							curveSegments: 12,
							bevelEnabled: false,
							bevelThickness: 10,
							bevelSize: 8,
							bevelSegments: 5
						});
						var material = new THREE.MeshPhongMaterial({
							color: 0xE0FFFF, 
							specular: 0x009900,
							shininess: 30,
							// shading: THREE.FlatShading
						});
						var textObj = new THREE.Mesh(geometry, material);
						textObj.castShadow = true;
						textObj.name = name;
						textObj.position.x = (arr[0].position.x + arr[1].position.x)/2;
						textObj.position.y = (arr[0].position.y + arr[1].position.y)/2 + 10;
						textObj.position.z = (arr[0].position.z + arr[1].position.z)/2;
						textObj.visible = vi;
						Relation.push( textObj );
						scene.add( textObj );
					}

				});

			}


			function animate() {

				requestAnimationFrame( animate );
				if ( Word && Relation ) {
					matchPosition();
					matchRelation();
				}
				render();
				// stats.update();
				transformControl.update();

			}

			function matchPosition() {

				var i = Word.length;
				while ( i-- ){

					name = Word[ i ].name;
					for ( var j = 0; j < splineHelperObjects.length; j ++) {

						for ( var p = 0; p < 2; p ++) {
							if (name == splineHelperObjects[ j ][ p ].name){
								Word[i].position.x = splineHelperObjects[j][p].position.x;
								Word[i].position.y = splineHelperObjects[j][p].position.y + 25;
								Word[i].position.z = splineHelperObjects[j][p].position.z;
								Word[i].lookAt(camera.position);
							}
						}

					}

				}

			}

			function matchRelation() {

				var i = Relation.length;
				while ( i-- ){
					name = Relation[ i ].name;
					slength = splineHelperObjects.length;
					while ( slength-- ) {
						j = slength;
						r_name = splineHelperObjects[ j ][0].name + splineHelperObjects[ j ][1].name;
						if ( name == r_name ){
							Relation[i].position.x = (splineHelperObjects[j][0].position.x + splineHelperObjects[j][1].position.x)/2;
							Relation[i].position.y = (splineHelperObjects[j][0].position.y + splineHelperObjects[j][1].position.y)/2 + 10;
							Relation[i].position.z = (splineHelperObjects[j][0].position.z + splineHelperObjects[j][1].position.z)/2;
							Relation[i].lookAt(camera.position);
						}
					}
				}

			}

			function render() {

				renderer.render( scene, camera );
			}

			function expandgraph( name ) {
				for (var i = 1; i < splineHelperObjects.length; i++){
					for ( var j = 0; j < 2; j++){
						if ( splineHelperObjects[ i ][ j ].name == name ) {
							splineHelperObjects[ i ][ 0 ].visible = true;
							splineHelperObjects[ i ][ 1 ].visible = true;
							Relation[ i ].visible = true;
							spline[ i ].mesh.visible = true;

						}
					}
				}
				for ( var i = 0; i < splineHelperObjects.length; i ++){
					for ( var j = 0; j < 2; j++){
						name = splineHelperObjects[ i ][ j ].name;
						xi = splineHelperObjects[ i ][ j ].visible;
						for ( var z = 0; z < Word.length; z ++){
							if ( Word[ z ].name == name ){
								Word[ z ].visible = xi; 
							}
						}
					}
				}

			}
			function showall( ) {
				for ( var i = 0; i < splineHelperObjects.length; i++){
					splineHelperObjects[ i ][ 0 ].visible = true;
					splineHelperObjects[ i ][ 1 ].visible = true;
					Relation[ i ].visible = true;
					spline[ i ].mesh.visible = true; 
				}
				for ( var i = 0; i < Word.length; i ++){
					Word[ i ].visible = true;
				}
			}