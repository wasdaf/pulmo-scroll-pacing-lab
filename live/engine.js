const breathFieldShader="uniform sampler2D breathMap;\nuniform vec4 breathRegion;\nuniform vec2 breathLevels;\nvec2 breathOffset(vec2 uv){\n if(max(breathLevels.x,breathLevels.y)<=0.)return vec2(0.);\n vec2 st=(uv-breathRegion.xy)/breathRegion.zw;\n if(any(lessThan(st,vec2(0.)))||any(greaterThan(st,vec2(1.))))return vec2(0.);\n const vec2 size=vec2(64.,40.);\n vec2 p=st*size-.5,i=floor(p),f=fract(p),s=1.-f;\n vec2 a=s*s*s/6.,b=(3.*f*f*f-6.*f*f+4.)/6.;\n vec2 c=(-3.*f*f*f+3.*f*f+3.*f+1.)/6.,d=f*f*f/6.;\n vec2 h0=(i-.5+b/(a+b))/size,h1=(i+1.5+d/(c+d))/size;\n vec2 t=c+d;\n vec4 move=mix(mix(textureLod(breathMap,h0,0.),textureLod(breathMap,vec2(h1.x,h0.y),0.),t.x),\n               mix(textureLod(breathMap,vec2(h0.x,h1.y),0.),textureLod(breathMap,h1,0.),t.x),t.y);\n return (move.xy*breathLevels.x+move.zw*breathLevels.y)/vec2(1920.,1080.);\n}\n";
window.airwayData={"stations":72,"rows":1692,"pathCount":13529,"oldCount":3600,"particleCount":4555,"ribbonCount":14941,"terminal":{"routes":30685,"width":800,"height":959,"origin":[-0.12180186807355531,-0.07073052041232589,0.3650000359630212,1.2810426993065891e-05],"span":[0.24265638406576834,0.14124254993196803,0.2200000104494393,0.002621078681416165],"slots":4},"parts":[175308,484395,581171,488216,588594,481155,534284,449350,556463,573974,474450,563037,463657,545252,458574,545310,543101,453588,539778,453875,538397,450125,538369,449537]};
window.airwayWidths=[3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4925293093339462, 3.4924865568038985, 3.492192183857481, 3.4914074718672343, 3.489907848203444, 3.487482967052429, 3.4839369091688486, 3.4790884476677952, 3.472771353397096, 3.464834715449693, 3.4551432544010448, 3.443577607926869, 3.4300345705954514, 3.4144272718476154, 3.3966852784754713, 3.376754610277182, 3.3545976599813434, 3.3301930109740234, 3.303535148794202, 3.2746340647543595, 3.2435147523559142, 3.210216599368401, 3.1747926804902136, 3.1373089573761885, 3.0978433944730304, 3.0564850005247512, 3.0133328067769427, 2.968494793809455, 2.9220867795551206, 2.8742312814174977, 2.825056365489675, 2.774694495711824, 2.723281395403281, 2.6709549329887947, 2.61785404293364, 2.5641176919359037, 2.509883899328763, 2.4552888194505638, 2.4004658924786133, 2.3455450689243342, 2.2906521116814718, 2.2359079782333233, 2.181428284383488, 2.12732284969864, 2.0736953237595905, 2.0206428913227317, 1.9682560536090619, 1.9166184821692576, 1.865806941125486, 1.8158912730646737, 1.7669344434515457, 1.718992638139635, 1.6721154083778287, 1.6263458576308027, 1.581720864545405, 1.5382713364906986, 1.4960224882668844, 1.4549941408065148, 1.415201034969327, 1.3766531558490978, 1.3393560633571526, 1.303311225213017, 1.268516348849293, 1.2349657091178967, 1.202650469061094, 1.1715589913773072, 1.1416771385641304, 1.1129885600545637, 1.0854749649747033, 1.0591163794393355, 1.0338913875645406, 1.009777355612894, 0.9867506388965753, 0.9647867712469709, 0.9438606370171461, 0.9239466257164058, 0.9050187694858869, 0.8870508637120006, 0.8700165711425589, 0.8538895099202637, 0.8386433259821653, 0.8242517502936144, 0.8106886413933455, 0.7979280137248087, 0.7859440522200193, 0.7747111135878966, 0.7642037147421459, 0.7543965087859197, 0.7452642489544573, 0.7367817409051234, 0.7289237837387977, 0.7216651001405829, 0.7149802560435059, 0.7088435702492513, 0.7032290144880272, 0.6981101044680303, 0.6934597825572824, 0.6892502928592593, 0.6854530495926031, 0.682038499866471, 0.6789759821601218, 0.6762335820702369, 0.6737779871840518, 0.6715743432718856, 0.6695861143688788, 0.6677749497315497, 0.6661005611069558, 0.664520614235514, 0.6629906390153459, 0.6614716729935165, 0.6599541501136972, 0.6584361544490511, 0.6569159057992627, 0.6553917561809763, 0.6538621863874151, 0.6523258026066516, 0.6507813330890734, 0.6492276248557648, 0.6476636404404622, 0.6460884546588038, 0.6445012513994228, 0.6429013204323306, 0.6412880542308019, 0.639660944803748, 0.6380195805361975, 0.6363636430362213, 0.6346929039871217, 0.6330072220043725, 0.631306539497144, 0.629590879534855, 0.6278603427194465, 0.6261151040645679, 0.6243554098830694, 0.6225815746845851, 0.6207939780851456, 0.6189930617310365, 0.6171793262392266, 0.6153533281569056, 0.6135156769426886, 0.6116670319722064, 0.6098080995707762, 0.6079396300759116, 0.6060624149324213, 0.6041772838227851, 0.6022851018354664, 0.6003867666737395, 0.5984832059075508, 0.5965753742707148, 0.5946642510057794, 0.5927508372585937, 0.5908361535245701, 0.5889212371484115, 0.5870071398788973, 0.5850949254801697, 0.5831856674007243, 0.5812804465011654, 0.5793803488415131, 0.5774864635287184, 0.5755998806247777, 0.5737216891156621, 0.5718529749410357, 0.5699948190845724, 0.568148295724444, 0.5663144704433393, 0.5644943984972256, 0.5626891231417999, 0.5608996740154614, 0.5591270655773686, 0.5573722955990772, 0.5556363437079505, 0.5539201699805055, 0.552224713583604, 0.5505508914612817, 0.5488995970649194, 0.5472716991242179, 0.5456680404564601, 0.5440894368112836, 0.542536675748222, 0.5410105155440798, 0.5395116841271668, 0.5380408780353378, 0.5365987613947425, 0.5351859649160543, 0.5338030849050508, 0.5324506822842, 0.5311292816220744, 0.5298393701672319, 0.5285813968833342, 0.5273557714821938, 0.5261628634515154, 0.5250030010740966, 0.5238764704352986, 0.5227835144157011, 0.5217243316658168, 0.5206990755599697, 0.5197078531263762, 0.5187507239507068, 0.5178276990504421, 0.5169387397175231, 0.5160837563269102, 0.5152626071088747, 0.5144750968829805, 0.5137209757519855, 0.5129999377540353, 0.5123116194718426, 0.511655598597749, 0.511031392453893, 0.5104384564669978, 0.5098761825976346, 0.5093438977241741, 0.5088408619820425, 0.5083662670592889, 0.5079192344499484, 0.5074988136671451, 0.5071039804184041, 0.5067336347461673, 0.506386599137125, 0.5060616166045705, 0.505757348748628, 0.5054723737999541, 0.5052051846531755, 0.5049541868971905, 0.5047176968501826, 0.5044939396081496, 0.5042810471165885, 0.5040770562759472, 0.5038799070924469, 0.5036874408868744, 0.5034973985750432, 0.5033078254482076, 0.5031183236980478, 0.5029288932976892, 0.5027395342202676, 0.5025502464389293, 0.5023610299268302, 0.5021718846571366, 0.5019828106030233, 0.5017938077376799, 0.5016048760343013, 0.5014160154660942, 0.5012272260062752, 0.5010385076280711, 0.5008498603047188, 0.5006612840094654, 0.5004727787155678, 0.5002843443962931, 0.5000959810249184, 0.49990768857473095, 0.49971946701902803, 0.499531316331117, 0.4993432364843152, 0.49915522745195007, 0.4989672892073592, 0.4987794217238882, 0.4985916249748982, 0.4984038989337548, 0.498216243573836, 0.4980286588685291, 0.4978411447912319, 0.4976537013153521, 0.49746632841430716, 0.497279026061525, 0.49709179423044314, 0.4969046328945093, 0.4967175420271815, 0.4965305216019268, 0.49634357159222336, 0.4961566919715586, 0.4959698827134285, 0.49578314379134436, 0.49559647517882155, 0.495409876849388, 0.49522334877658114, 0.4950368909339485, 0.4948505032950474, 0.4946641858334454, 0.4944779385227198, 0.494291761336458, 0.4941056542482571, 0.49391961723172445, 0.49373365026047705, 0.493547753308142, 0.4933619263483563, 0.49317616935476677, 0.4929904823010306, 0.49280486516081246, 0.4926193179077926, 0.4924338405156559, 0.49224843295809895, 0.492063095208828, 0.4918778272415593, 0.49169262903001926, 0.4915075005479439, 0.49187934437373426, 0.49369058639094415, 0.4945103552574942, 0.4904777722130884, 0.47955611803264053, 0.46467174698487534, 0.4517241453302314, 0.44330136569493456, 0.4392447071435591, 0.43803960141946785, 0.43792759237634693, 0.43790849504907153, 0.4377784186468878, 0.4374366408616714, 0.4367935115435833, 0.43577066727778113, 0.4343011172151033, 0.4323293289027534, 0.42981152869169575, 0.42671540132925984, 0.4230201757898247, 0.4187161961213972, 0.41380457812287436, 0.4082964368678838, 0.40221228588999336, 0.39558096429915596, 0.38843886430555036, 0.38082847209794657, 0.3727975953675463, 0.36439794710169093, 0.3556840512426352, 0.3467120625156373, 0.33753877937608817, 0.32822059258362807, 0.3188125625222892, 0.3093676896396785, 0.2999362492591739, 0.29056521222280446, 0.2812978801108417, 0.27217349900372034, 0.263227130736011, 0.25448958852340753, 0.24598735113204234, 0.23774269162451306, 0.22977378464823797, 0.22209489955449582, 0.2147165720597948, 0.20764592611093874, 0.20088690991940927, 0.19444053199574796, 0.18830507572626706, 0.18247654998414278, 0.17694861402756623, 0.17171312467035652, 0.16676011482428957, 0.16207799734697353, 0.1576533611939735, 0.15347145421641092, 0.14951664450089241, 0.14577216287745653, 0.1422201565637514, 0.13884174280921255, 0.13561700889506298, 0.13252502286314854, 0.1295439193466225, 0.1266508888411098, 0.12382306819805773, 0.12104148883621746, 0.11829078706308427, 0.11555841014106702, 0.1128343802531061, 0.11011110138363354, 0.10738310182651988, 0.10464685179486981, 0.10190058103081794, 0.09914404277114665, 0.09637838500125956, 0.09360594660730616, 0.09083005352830631, 0.08805487928128818, 0.08528525720666613, 0.08252652490012527];
/* A single camera and opacity cue sheet is shared by the website, study and exported previews. */
window.airwayTiming=(()=>{
 const fps=24,holdEnd=72,cycle=40;
 const clamp=x=>Math.max(0,Math.min(1,x));
 const ease=(a,b,x)=>{const u=clamp((x-a)/(b-a));return u*u*u*(10+u*(6*u-15))};
 // A monotone cubic keeps velocity continuous through the pharynx, carina and distal tree.
 // Depth uses the connected path-distance field already embedded in the mesh.
 const stops=[[0,-.025],[.41667,-.012],[1.40,.080],[3.00,.198],[4.75,.264],[6.25,.30],
  [10,.46],[17,.70],[23,.89],[28,1.018],[30,1.018]];
 function monotone(points,x){
  if(x<=points[0][0])return points[0][1];
  const slope=i=>(points[i+1][1]-points[i][1])/(points[i+1][0]-points[i][0]);
  function tangent(i){
   if(!i)return slope(0);
   if(i===points.length-1)return slope(i-1);
   const l=slope(i-1),r=slope(i);if(l*r<=0)return 0;
   const dl=points[i][0]-points[i-1][0],dr=points[i+1][0]-points[i][0];
   return 3*(dl+dr)/((2*dr+dl)/l+(dr+2*dl)/r);
  }
  for(let i=1;i<points.length;i++){
   const [b,v]=points[i];if(x>b)continue;
   const [a,u]=points[i-1],h=b-a,s=(x-a)/h;
   return (2*s**3-3*s*s+1)*u+(s**3-2*s*s+s)*h*tangent(i-1)+(-2*s**3+3*s*s)*v+(s**3-s*s)*h*tangent(i);
  }
  return points.at(-1)[1];
 }
 const zoomTimes=[[72,3],[115,4.85],[174,8.3],[244,12.7],[325,17.4],[396,22.4],[446,28]];
 const clockAt=f=>f<=holdEnd?f/fps:monotone(zoomTimes,f);
 function state(clock,mode,f,holding){
  const at=((clock%cycle)+cycle)%cycle;
  const t=holding&&f<=holdEnd?f/fps:mode==='zoom'?clockAt(f):at;
  let front=monotone(stops,t);
  if(mode==='steady')front=front+(1.018-front)*ease(holdEnd,174,f);
  const clear=mode==='fill'&&!(holding&&f<=holdEnd)?-.025+1.055*ease(30,39,t):-.025;
  const wall=ease(92,210,f),gas=ease(10,25,f);
  const label=f===0?'Ghost CT':gas===0?'Opening hold':mode==='steady'&&f>=174?'Continuous flow':
   clear>.99?'Rest':clear>-.020?'Clearing':front<.137?'Nose and mouth':front<.264?'Throat and trachea':
   front<.44?'Main bronchi':front<.76?'Bronchial branches':front<1?'Peripheral branches':'Filled';
  return {front,clear,wall,gas,label,t};
 }
 return {fps,holdEnd,cycle,clockAt,state};
})();

'use strict';
// Each particle carries its original curve and material coordinate through camera changes.
// Mouse offsets are two local radii and one distance along that same curve.
function cross3(a,b){
 return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
}
function unit3(a){const n=Math.hypot(...a)||1;return a.map(x=>x/n)}
function particleStation(k,t){
 const at=Math.min(70.9999,Math.max(0,t*71)),j=Math.floor(at),i=(72*k+j)*4+3;
 return axes[i]+(axes[i+4]-axes[i])*(at-j);
}
function stationAtArrival(k,arrival){
 let lo=0,hi=1;
 for(let n=0;n<10;n++){const mid=(lo+hi)/2;if(particleStation(k,mid)<arrival)lo=mid;else hi=mid}
 return (lo+hi)/2;
}
function particlePose(a,k,t,q,lateralX=0,lateralY=0){
 const t0=Math.max(0,t-.008),t1=Math.min(1,t+.008);
 const p0=coords(k,t0),p1=coords(k,t1),tan=unit3(p1.slice(0,3).map((x,i)=>x-p0[i]));
 const u=unit3(cross3(tan,[0,1,.017])),v=cross3(tan,u);
 const phase=dots[a+4];
 const spin=.73*(Math.sin(t*4.9+phase*.8-time*.49)+.38*Math.sin(t*13+phase*1.7-time*.79))+.25*Math.sin(t*31+phase-time*.88);
 const c=Math.cos(spin),s=Math.sin(spin);
 let x=c*dots[a+2]-s*dots[a+3]+.039*Math.sin(29*t+1.45*phase-time*.86)+.014*Math.cos(61*t+1.1*phase+time*.82);
 let y=s*dots[a+2]+c*dots[a+3]+.09*Math.sin(t*15+phase+time*.67)+.034*Math.sin(t*53+phase-time*.94);
 x+=lateralX;y+=lateralY;
 const bound=Math.min(1,.87/(Math.hypot(x,y)||1));x*=bound;y*=bound;
 const home=q.slice(0,3).map((n,i)=>n+q[3]*(x*u[i]+y*v[i]));
 const screen=project(home),su=project(home.map((n,i)=>n+q[3]*u[i])),sv=project(home.map((n,i)=>n+q[3]*v[i]));
 const begin=project(p0),end=project(p1);
 return {screen,ux:su[0]-screen[0],uy:su[1]-screen[1],vx:sv[0]-screen[0],vy:sv[1]-screen[1],
  tangentX:(end[0]-begin[0])/(t1-t0),tangentY:(end[1]-begin[1])/(t1-t0)};
}
const clampTo=(n,lo,hi)=>Math.max(lo,Math.min(hi,n));
// The short, fading wake is shared by the large-airway and terminal particles.
const stroke={x:0,y:0,tailX:0,tailY:0,strength:0,inside:false};
function stepStroke(dt){
 if(pointer.inside){
  const jump=Math.hypot(pointer.x-stroke.x,pointer.y-stroke.y);
  if(!stroke.inside||jump>160){stroke.tailX=pointer.x;stroke.tailY=pointer.y}
  stroke.x=pointer.x;stroke.y=pointer.y;
 }
 const follow=1-Math.exp(-10.5*dt);
 stroke.tailX+=(stroke.x-stroke.tailX)*follow;stroke.tailY+=(stroke.y-stroke.tailY)*follow;
 const cap=Math.min(1,30/Math.max(.001,Math.hypot(stroke.tailX-stroke.x,stroke.tailY-stroke.y)));
 stroke.tailX=stroke.x+(stroke.tailX-stroke.x)*cap;stroke.tailY=stroke.y+(stroke.tailY-stroke.y)*cap;
 stroke.strength+=((pointer.inside?1:0)-stroke.strength)*(1-Math.exp(-(pointer.inside?24:5.5)*dt));
 if(!pointer.inside&&stroke.strength<.0003)stroke.strength=0;
 stroke.inside=pointer.inside;
}
function cursorStep(dt){
 if(!pointer.inside&&!stroke.strength&&!window.lastPush)return;
 stepStroke(dt);
 const state=cue(),visible=stroke.strength>.001&&state.gas>.001;
 const wx=stroke.tailX-stroke.x,wy=stroke.tailY-stroke.y,w2=wx*wx+wy*wy;
 const factor=Math.hypot(camera[0],camera[1],camera[2])*640;
 const sample=[0,0,0,0],screen=[0,0,0];
 let moving=0;
 for(let j=0;j<data.particleCount;j++){
  const i=j*4,a=j*8,k=dots[a];if(!dots[a+7])continue;let x=0,y=0,along=0,amount=0;
  if(visible){
   const rate=clampTo(.0055/Math.max(.001,meta[k*4+2]),.072,.40)*dots[a+5];
   const t=(dots[a+1]+time*rate)%1,q=coords(k,t,sample),center=project(q,screen);
   const radius=q[3]*factor/Math.max(.0001,center[2]),reach=clampTo(42+1.2*radius,45,71);
   if(center[2]>.001&&Math.abs(center[0]-stroke.x)<reach+radius+Math.abs(wx)&&Math.abs(center[1]-stroke.y)<reach+radius+Math.abs(wy)){
    const filled=particleStation(k,t);
    if(filled<state.front+.003&&filled>state.clear-.003){
     const p=particlePose(a,k,t,q),sx=p.screen[0]-stroke.x,sy=p.screen[1]-stroke.y;
     const u=clampTo((sx*wx+sy*wy)/Math.max(1,w2),0,1);
     const dx=sx-u*wx,dy=sy-u*wy,dist=Math.hypot(dx,dy);
     if(dist<reach){
      const fx=dx/Math.max(.25,dist),fy=dy/Math.max(.25,dist),h=1-dist/reach;
      amount=h*h*(3-2*h)*stroke.strength*(1-.32*u);
      x=(fx*p.ux+fy*p.uy)*amount*1.84/Math.max(1,radius);
      y=(fx*p.vx+fy*p.vy)*amount*1.84/Math.max(1,radius);
      const speed=Math.hypot(p.tangentX,p.tangentY),side=(dx*p.tangentX+dy*p.tangentY)/Math.max(1,speed);
      const sign=side/Math.sqrt(side*side+3.2);
      const carry=clampTo(-(wx*p.tangentX+wy*p.tangentY)/(30*Math.max(1,speed)),-1,1);
      const longitudinal=clampTo(Math.abs(side)/Math.max(1,dist)*1.6,.38,1);
      // The soft shoulder parts a stream in both directions even on a narrow, oblique branch.
      along=amount*clampTo(sign*longitudinal+.32*carry,-1.16,1.16)*Math.min(.35,44/Math.max(1,speed));
      let target=clampTo(t+along,.003,.997);
      if(particleStation(k,target)>state.front)target=Math.min(target,Math.max(t,stationAtArrival(k,state.front)));
      if(particleStation(k,target)<state.clear)target=Math.max(target,Math.min(t,stationAtArrival(k,state.clear)));
      along=target-t;
     }
    }
   }
  }
  if(!amount&&pushes[i]===0&&pushes[i+1]===0&&pushes[i+2]===0&&pushes[i+3]===0)continue;
  const spring=1-Math.exp(-(amount>pushes[i+3]?23:5.8)*dt);
  pushes[i]+=(x-pushes[i])*spring;pushes[i+1]+=(y-pushes[i+1])*spring;
  pushes[i+2]+=(along-pushes[i+2])*spring;pushes[i+3]+=(amount-pushes[i+3])*spring;
  if(!amount&&Math.max(Math.abs(pushes[i]),Math.abs(pushes[i+1]),Math.abs(pushes[i+2])*8,pushes[i+3])<.0005)pushes.fill(0,i,i+4);
  else moving++;
 }
 window.lastPush=moving;
 gl.bindBuffer(gl.ARRAY_BUFFER,pushBuffer);gl.bufferSubData(gl.ARRAY_BUFFER,0,pushes);
}

'use strict';
// Stations 0ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“8, 8ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“16 and 16ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“24 follow successive connected branches into one tip.
const lungParticles = (() => {
  let routeTex,ageTex;
  let context, pipe, vao, config, uniforms, lastCamera;
  const vertexSource=`#version 300 es
  precision highp float;
  precision highp int;
  uniform highp usampler2D routes, arrivals;
  uniform mat4 camera;
  uniform vec4 origin, span;
  uniform vec3 forward, hover;
  uniform vec2 wake;
  uniform float clock,front,clearFront,opacity,detail;
  ${breathFieldShader}
  out vec2 originalOffset; out vec2 referenceUV; uniform float bloomPass; uniform vec4 flight; uniform mat4 flightCamera; uniform bool measuredFlight; uniform vec2 flightRadius;
  out float energy, depth, wallRadius;
  uint hash(uint x){x^=x>>16;x*=0x7feb352du;x^=x>>15;x*=0x846ca68bu;return x^(x>>16);}
  float random(uint x){return float(hash(x)>>8)/16777216.;}
  ivec2 address(int route,int station){return ivec2((route%32)*25+station,route/32);}
  vec4 station(ivec2 at){return origin+span*(vec4(texelFetch(routes,at,0))/65535.);}
  float arrival(ivec2 at){return float(texelFetch(arrivals,at,0).r)/65535.;}
  vec4 positionOn(ivec2 base,float along,out vec3 tangent){
    float t=clamp(along,0.,23.9999);ivec2 j=base+ivec2(int(t),0);
    vec4 a=station(j), b=station(j+ivec2(1,0));
    tangent=normalize(b.xyz-a.xyz+vec3(1.e-10));
    return mix(a,b,fract(t));
  }
  void main(){
    int id=gl_VertexID, route=id/4, slot=id%4;
    uint seed=uint(id)*11u;
    float cohort=random(seed+1u),phase=random(seed+2u),variety=random(seed+3u);
    ivec2 base=address(route,0);
    float begin=arrival(base), end=arrival(base+ivec2(24,0));
    gl_Position=vec4(3.,3.,3.,1.);gl_PointSize=1.;energy=0.;depth=0.;wallRadius=0.;
    if(all(equal(texelFetch(routes,base,0),uvec4(0)))||front<begin||clearFront>end+.08)return;
    bool mobile=slot==0;
    // Different terminal lanes fill at different times; the last admits its final
    // collector at or before the camera's fully filled cue. Capacity is fixed.
    float start=begin+(min(.135,(1.014-begin)*.40))*cohort;
    float settle=end+min(.15,max(.008,1.014-end))*(.28+.70*cohort);
    float progress=smoothstep(start,max(start+.012,settle),front);
    if(!mobile&&progress<=0.)return;
    float rest=15.7+8.*(float(max(0,slot-1))+phase)/3.;
    float eddy=sin(clock*.79+float(route%29)*.31);
    float along=mobile?fract(phase+clock*(.087+.089*variety)+.014*eddy)*24.:mix(.5,rest,progress);
    if(!mobile)along+=(sin(clock*(.83+cohort)+phase*6.28)*(.15+.23*variety)+.14*eddy)*progress;
    along=clamp(along,0.,23.995);
    int j=int(along);
    float local=mix(arrival(base+ivec2(j,0)),arrival(base+ivec2(j+1,0)),fract(along));
    float arrived=smoothstep(-.001,.013,front-local);
    float retained=1.-smoothstep(local-.008,local+.024,clearFront);
    if(arrived*retained<.002)return;
    vec3 tangent;vec4 p=positionOn(base,along,tangent);
    vec3 u=normalize(cross(tangent,abs(tangent.y)<.93?vec3(0,1,0):vec3(1,0,0)));
    vec3 v=cross(tangent,u);
    float angle=phase*6.283+sin(clock*.74+cohort*8.)*.51+.14*eddy;
    vec2 lateral=(.16+.60*sqrt(variety))*vec2(cos(angle),sin(angle));
    vec3 pos=p.xyz+p.w*(u*lateral.x+v*lateral.y);
    vec4 clip=camera*vec4(pos,1.);
    if(clip.w<=.001||any(greaterThan(abs(clip.xy),vec2(clip.w*1.05))))return;
    vec2 scale=vec2(640.,-360.);
    vec2 screen=vec2(640.,360.)+clip.xy/clip.w*scale;
    float radiusPX=p.w*length(vec3(camera[0][0],camera[1][0],camera[2][0]))*640./clip.w;
    vec2 delta=screen-hover.xy;
    float trail=clamp(dot(delta,wake)/max(1.,dot(wake,wake)),0.,1.);
    delta-=trail*wake;
    float push=hover.z*(1.-.32*trail)*(1.-smoothstep(2.,52.,length(delta)));
    if(push>.001){
      vec4 other=camera*vec4(pos+.001*tangent,1.);
      vec2 dir=normalize((other.xy/other.w-clip.xy/clip.w)*scale+vec2(.00001));
      float side=dot(delta,dir);
      float sweep=clamp(-dot(wake,dir)/30.,-1.,1.);
      float displacement=clamp(side/sqrt(side*side+3.2)+.32*sweep,-1.16,1.16);
      // Displace along the actual route and traverse only the available lumen radius.
      float newStation=clamp(along+displacement*push*(3.2+2.5*variety),0.,23.995);
      int index=int(newStation);
      float targetAge=mix(arrival(base+ivec2(index,0)),arrival(base+ivec2(index+1,0)),fract(newStation));
      float allowed=smoothstep(-.001,.009,front-targetAge)*(1.-smoothstep(targetAge-.004,targetAge+.008,clearFront));
      p=positionOn(base,mix(along,newStation,allowed),tangent);
      u=normalize(cross(tangent,abs(tangent.y)<.93?vec3(0,1,0):vec3(1,0,0)));v=cross(tangent,u);
      vec2 force=delta/max(.001,length(delta));
      vec4 cu=camera*vec4(pos+.001*u,1.),cv=camera*vec4(pos+.001*v,1.);
      lateral+=push*.90*vec2(dot(force,normalize((cu.xy/cu.w-clip.xy/clip.w)*scale+vec2(.00001))),dot(force,normalize((cv.xy/cv.w-clip.xy/clip.w)*scale+vec2(.00001))));
      lateral*=min(1.,.83/max(.001,length(lateral)));
      pos=p.xyz+p.w*(u*lateral.x+v*lateral.y);clip=camera*vec4(pos,1.);
    }
    depth=.5+dot(pos-vec3(0.,0.,.55),forward)/.50;
    wallRadius=p.w/.50;
    float fade=mobile?smoothstep(0.,.8,min(along,24.-along)):smoothstep(0.,.39,progress);
    energy=opacity*arrived*retained*fade*mix(.32,1.,variety)*mix(.72,1.,detail)*(.93+.07*sin(clock*.7+6.28*phase))*(1.+.21*push);
    gl_PointSize=.5*mix(1.,3.6,bloomPass)*mix(1.,clamp(sqrt(measuredFlight?max(0.,clip.w*(clip.w-flightRadius.x))*pow(flightRadius.y/max(.0001,(flightCamera*vec4(clip.xy,clip.w,1.)).w),2.):clip.w/max(.001,clip.w-flight.z)),.55,measuredFlight?6.:2.2),float(flight.z>0.))*clamp((2.65+1.45*variety+.54*sqrt(max(0.,radiusPX)))*(mobile?1.10:1.)*mix(1.,clamp(sqrt(max(.05,radiusPX)*.5),.68,2.4),detail),1.8,13.);
    originalOffset=breathOffset(clip.xy/clip.w*vec2(.5,-.5)+.5);
    clip.xy+=originalOffset*vec2(2.,-2.)*clip.w;
    referenceUV=clip.xy/clip.w*vec2(.5,-.5)+.5-originalOffset;
    if(flight.z>0.){
      energy*=1.-smoothstep(.001,.014,flight.z)*smoothstep(flight.w-.001,flight.w+.001,clip.w);
      clip=measuredFlight?flightCamera*vec4(clip.xy,clip.w,1.):clip-vec4(flight.xy,flight.z*1.000005,flight.z);
    }
    gl_Position=clip;
  }`;
  const fragmentSource=`#version 300 es
  precision highp float;
  in vec2 originalOffset; in vec2 referenceUV; uniform float bloomPass; uniform vec4 glowFocus;
uniform sampler2D goldLuminance;
float goldGrade(){
  vec2 uv=vec2(gl_FragCoord.x/960.,1.-gl_FragCoord.y/540.);
  return smoothstep(.34,.72,texture(goldLuminance,uv).r);
}
    float pointerLight(){
      vec2 uv=gl_FragCoord.xy/vec2(960.,540.);
      vec2 delta=(vec2(uv.x,1.-uv.y)-glowFocus.xy)*vec2(16./9.,1.);
      return glowFocus.w*(1.-smoothstep(0.,max(.0001,glowFocus.z),length(delta)));
    } uniform vec4 flight;
uniform sampler2D bounds;
  in float energy,depth,wallRadius;
  uniform float useAccent; out vec4 pixel;
  void main(){
    vec2 pt=gl_PointCoord*2.-1.; float rr=dot(pt,pt);
    if(rr>1.||energy<.002)discard;
    vec3 field=texture(bounds,(flight.z>0.?referenceUV:vec2(gl_FragCoord.x/960.,1.-gl_FragCoord.y/540.)-originalOffset)).rgb;
    if(field.b<.035)discard;
    float behind=max(0.,depth-field.r/max(field.b,.01)-1.30*wallRadius-.003);
    float transmission=(.085+.915*exp(-43.*behind))*(.44+.56*clamp(field.g/max(field.b,.1),0.,1.));
    float light=energy*transmission*smoothstep(.035,.75,field.b)*exp(-2.65*rr)*(1.-smoothstep(.61,1.,rr));

          float hot=pointerLight();
          light*=bloomPass>.5?.20*hot:1.+.60*hot;
          vec3 tint=mix(mix(vec3(.976,.988,1.),vec3(1.,.79,.045),useAccent),mix(vec3(.86,1.,.96),vec3(1.,.86,.18),useAccent),hot*(1.-bloomPass)*.54);
          if(bloomPass<.5){
            float sheen=1.-smoothstep(.0,.64,length(gl_PointCoord-vec2(.34,.29)));
            tint=mix(tint*.93,mix(vec3(.96,1.,1.),vec3(1.,.87,.24),useAccent),.36*sheen);
          }
          float grade=useAccent*goldGrade();
          vec3 deep=mix(vec3(.48,.25,.03),vec3(.67,.37,.06),hot*.45);
          tint=mix(tint,deep,grade);
          if(bloomPass>.5) light*=1.-grade;
          pixel=vec4(tint*light,light);
  }`;
  function integerTexture(unit,format,channels,data){
    const gl=context, tex=gl.createTexture();
    gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,tex);
    for(const key of [gl.TEXTURE_MIN_FILTER,gl.TEXTURE_MAG_FILTER])gl.texParameteri(gl.TEXTURE_2D,key,gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D,0,format,config.width,config.height,0,channels,gl.UNSIGNED_SHORT,data);return tex;
  }
  async function initialize(gl){
    context=gl;
    config=window.airwayData.terminal;
    pipe=gl.createProgram();
    for(const [type,source] of [[gl.VERTEX_SHADER,vertexSource],[gl.FRAGMENT_SHADER,fragmentSource]]){
      gl.attachShader(pipe,makeShader(type,source));
    }
    gl.linkProgram(pipe);
    if(!gl.getProgramParameter(pipe,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(pipe));
    vao=gl.createVertexArray();gl.useProgram(pipe);
    uniforms=Object.fromEntries(['bloomPass','glowFocus','goldLuminance','useAccent','routes','arrivals','bounds','origin','span','camera','clock','front','clearFront','opacity','detail','hover','wake','forward'].map(name=>[name,gl.getUniformLocation(pipe,name)]));
    routeTex=integerTexture(4,gl.RGBA16UI,gl.RGBA_INTEGER,null);
    ageTex=integerTexture(5,gl.R16UI,gl.RED_INTEGER,null);
    gl.uniform1i(uniforms.goldLuminance,9);gl.uniform1i(uniforms.routes,4);gl.uniform1i(uniforms.arrivals,5);gl.uniform1i(uniforms.bounds,2);
    gl.uniform4fv(uniforms.origin,config.origin);gl.uniform4fv(uniforms.span,config.span);gl.useProgram(program);
  }
  function draw(state,bloom,focus){
    if(!pipe||!api.enabled||state.gas<.001||state.front<.30||actualProfile)return;
    const gl=context;
    gl.useProgram(pipe);gl.uniform1f(uniforms.useAccent,window.flowAccent?1:0);gl.uniform1f(uniforms.bloomPass,bloom);gl.uniform4fv(uniforms.glowFocus,focus);breath.uniforms(pipe);gl.bindVertexArray(vao);
    if(lastCamera!==camera){
      lastCamera=camera;const m=new Float32Array(16);
      for(let i=0;i<4;i++)for(let j=0;j<4;j++)m[i*4+j]=camera[j*4+i];
      gl.uniformMatrix4fv(uniforms.camera,false,m);gl.uniform3fv(uniforms.forward,forward);
      gl.uniform1f(uniforms.detail,Math.max(0,Math.min(1,(.32-window.airwayWidths[frame])/.23)));
    }
    gl.uniform1f(uniforms.clock,time);gl.uniform1f(uniforms.front,state.front);gl.uniform1f(uniforms.clearFront,state.clear);
    gl.uniform1f(uniforms.opacity,state.gas);gl.uniform3f(uniforms.hover,stroke.x,stroke.y,stroke.strength);
    gl.uniform2f(uniforms.wake,stroke.tailX-stroke.x,stroke.tailY-stroke.y);
    gl.drawArrays(gl.POINTS,0,api.capacity);
    gl.bindVertexArray(null);gl.useProgram(program);
  }
  function install(ranges,values){
    const gl=context,w=config.width,n=values.length/5;
    const xyz=new Uint16Array(n*4),ages=new Uint16Array(n);
    for(let i=0;i<n;i++){
      for(let c=0;c<4;c++)xyz[i*4+c]=values[i*5+c];
      ages[i]=values[i*5+4];
    }
    let offset=0;
    for(const [row,len] of ranges){
      gl.activeTexture(gl.TEXTURE4);gl.bindTexture(gl.TEXTURE_2D,routeTex);
      gl.texSubImage2D(gl.TEXTURE_2D,0,0,row,w,len,gl.RGBA_INTEGER,gl.UNSIGNED_SHORT,xyz.subarray(offset*4,(offset+len*w)*4));
      gl.activeTexture(gl.TEXTURE5);gl.bindTexture(gl.TEXTURE_2D,ageTex);
      gl.texSubImage2D(gl.TEXTURE_2D,0,0,row,w,len,gl.RED_INTEGER,gl.UNSIGNED_SHORT,ages.subarray(offset,offset+len*w));
      offset+=len*w;
    }
  }
  const api={initialize,install,draw,enabled:true,relaxing:()=>stroke.strength>0,get capacity(){return config?config.routes*config.slots:0}};
  return api;
})();

'use strict';
const $=id=>document.getElementById(id), data=window.airwayData, canvas=$('flow');
const gl=canvas.getContext('webgl2',{alpha:true,premultipliedAlpha:true,antialias:false,preserveDrawingBuffer:true});
const W=1280,H=720,timing=window.airwayTiming;
const embedded=new URLSearchParams(location.search).has('embed');
const vertex=`#version 300 es
precision highp float; precision highp int;
layout(location=0) in vec4 home;
layout(location=1) in vec4 style;
layout(location=2) in vec4 push;
uniform highp sampler2D curves,info,axisField;
uniform mat4 camera; uniform vec3 forward;
uniform float clock,front,clearFront,study,pointPass,mist,distalZoom;
uniform int segments;
${breathFieldShader}
out vec2 originalOffset; out vec2 referenceUV; uniform float bloomPass; uniform vec4 flight; uniform mat4 flightCamera; uniform bool measuredFlight; uniform vec2 flightRadius;
out vec2 uv;out float energy,thin,coverDepth,radius,arrival,veil,fray;
vec4 curve(int id,float t){
 float s=clamp(t,0.,.999999)*71.;int j=int(s);
 ivec2 k=ivec2((id%8)*72+j,id/8);
 return mix(texelFetch(curves,k,0),texelFetch(curves,k+ivec2(1,0),0),fract(s));
}
vec3 fiber(int id,float t,float time,float kind,out float rad){
 vec4 p=curve(id,t);vec3 tan=normalize(curve(id,min(1.,t+.008)).xyz-curve(id,max(0.,t-.008)).xyz+vec3(1.e-9));
 vec3 u=normalize(cross(tan,vec3(0.,1.,.017))+vec3(1.e-9));
 if(kind<.5){
  float at=clamp(t,0.,.999999)*71.;ivec2 ij=ivec2((id%8)*72+int(at),id/8);
  u=normalize(mix(texelFetch(axisField,ij,0).xyz,texelFetch(axisField,ij+ivec2(1,0),0).xyz,fract(at)));
 }
 vec3 v=cross(tan,u);
 float a=style.x;vec2 off=home.zw;
 float bend=sin(t*4.9+a*.8-time*.49)+.38*sin(t*13.+a*1.7-time*.79);
 float spin=.73*bend+.25*sin(t*31.+a-time*.88);
 off=mat2(cos(spin),sin(spin),-sin(spin),cos(spin))*off;
 float micro=.039*sin(29.*t+1.45*a-time*.86)+.014*cos(61.*t+1.1*a+time*.82);
 off+=vec2(micro,.09*sin(t*15.+a+time*.67)+.034*sin(t*53.+a-time*.94));
 if(kind>.5)off+=push.xy;
 off*=min(1.,.87/max(.0001,length(off)));rad=p.w;
 return p.xyz+(u*off.x+v*off.y)*p.w;
}
void main(){
 int id=int(home.x+.5);vec4 meta=texelFetch(info,ivec2(id%8,id/8),0);
 int vi=gl_VertexID;bool dotPass=pointPass>.5;
 float t=dotPass?fract(home.y+clock*clamp(.0055/max(.001,meta.z),.072,.40)*style.y):float(vi/2)/float(segments);
 if(dotPass)t=clamp(t+push.z,0.,.99999);
 float side=float(vi%2)*2.-1.;float rr;vec3 p=fiber(id,t,clock,pointPass,rr);
 float tr;vec3 q=fiber(id,clamp(t+(t>.994?-.006:.006),0.,1.),clock,pointPass,tr);
 vec4 clip=camera*vec4(p,1.);vec4 proj=camera*vec4(q,1.);
 vec2 screenDir=normalize((proj.xy/proj.w-clip.xy/clip.w)*vec2(1280.,720.)+vec2(1.e-8));if(t>.994)screenDir=-screenDir;
 vec2 normal=vec2(-screenDir.y,screenDir.x);
 float px=rr*length(vec3(camera[0][0],camera[1][0],camera[2][0]))*640./max(.0001,clip.w);
 float station=clamp(t,0.,.999999)*71.;
 ivec2 address=ivec2((id%8)*72+int(station),id/8);
 arrival=mix(texelFetch(axisField,address,0).w,texelFetch(axisField,address+ivec2(1,0),0).w,fract(station));
 fray=.0017*sin(style.x+t*9.+.3*sin(clock*.31))*sin(3.14159*t);
 float wave=.5+.5*sin(t*(4.4+style.y*2.7)-clock*(1.3+.5*style.y)+style.x+1.2*sin(t*7.+style.x));
 float cap=.45+.55*smoothstep(0.,.055,min(t,1.-t));
 energy=style.w*cap;
 thin=clamp(px/.78,.04,1.);
 float visibleWidth;
 if(dotPass){
   float along=float(vi/2)*2.-1.;uv=vec2(along,side);
   visibleWidth=clamp((.98+.13*px)*style.z,.95,3.05);
   visibleWidth*=mix(1.,3.2,bloomPass);vec2 shift=screenDir*along*visibleWidth*(1.15+.24*wave)+normal*side*visibleWidth;
   clip.xy+=shift*clip.w*vec2(2./1280.,2./720.);
   energy*=(1.45+.50*wave+.40*push.w)*smoothstep(0.,.027,min(t,1.-t));
   thin=sqrt(thin);veil=0.;
 }else{
   uv=vec2(t,side);visibleWidth=clamp(.67+px*(.040+.026*style.y),.70,5.);
   veil=mist;
   if(style.y>1.16&&px>1.7){visibleWidth*=1.65+4.5*mist;energy*=.12+.53*mist;}
   else visibleWidth*=1.+mist*.85;
   clip.xy+=mix(1.,3.6,bloomPass)*normal*side*visibleWidth*clip.w*vec2(2./1280.,2./720.);
   energy*=.33+.67*wave*wave;
   float deepBranch=.33+.67*smoothstep(.00024,.00155,rr);
   energy*=mix(1.,deepBranch*(.63+.23*wave),distalZoom);
 }
 coverDepth=.5+dot(p-vec3(0.,0.,.55),forward)/.50;radius=rr/.50;
 originalOffset=breathOffset(clip.xy/clip.w*vec2(.5,-.5)+.5);
    clip.xy+=originalOffset*vec2(2.,-2.)*clip.w;
    referenceUV=clip.xy/clip.w*vec2(.5,-.5)+.5-originalOffset;
    if(flight.z>0.){
      energy*=1.-smoothstep(.001,.014,flight.z)*smoothstep(flight.w-.001,flight.w+.001,clip.w);
      clip=measuredFlight?flightCamera*vec4(clip.xy,clip.w,1.):clip-vec4(flight.xy,flight.z*1.000005,flight.z);
    }
    gl_Position=clip;
}`;
const fragment=`#version 300 es
precision highp float;
in vec2 originalOffset; in vec2 referenceUV; uniform float bloomPass; uniform vec4 glowFocus;
uniform sampler2D goldLuminance;
float goldGrade(){
  vec2 uv=vec2(gl_FragCoord.x/960.,1.-gl_FragCoord.y/540.);
  return smoothstep(.34,.72,texture(goldLuminance,uv).r);
}
    float pointerLight(){
      vec2 uv=gl_FragCoord.xy/vec2(960.,540.);
      vec2 delta=(vec2(uv.x,1.-uv.y)-glowFocus.xy)*vec2(16./9.,1.);
      return glowFocus.w*(1.-smoothstep(0.,max(.0001,glowFocus.z),length(delta)));
    } uniform vec4 flight;
uniform sampler2D bounds;uniform float pointPass,opacity,front,clearFront,study,useAccent;
in vec2 uv;in float energy,thin,coverDepth,radius,arrival,veil,fray;out vec4 color;
void main(){
 vec3 f=texture(bounds,(flight.z>0.?referenceUV:vec2(gl_FragCoord.x/960.,1.-gl_FragCoord.y/540.)-originalOffset)).rgb;
 if(f.b<.08||energy<.002)discard;
 float depth=f.r/max(f.b,.004);
 float behind=max(0.,coverDepth-depth-1.33*radius-.004);
 float occ=exp(-behind*75.);
 float tissue=clamp(f.g,0.,1.);
 float alpha;
 if(pointPass>.5){
   float d=dot(uv,uv);alpha=exp(-3.3*d)*smoothstep(1.6,.60,d)*.94;
 }else{
   float d=abs(uv.y);float core=exp(-3.6*d*d*(1.+3.*veil));
   float wisps=.31*veil*exp(-1.8*d*d);
   alpha=(core*.74+wisps)*(1.-smoothstep(.72,1.,d));
 }
 float age=front-arrival+fray;
 float tip=smoothstep(-.005,.012,age);
 float filled=tip*smoothstep(-.009,.013,arrival-clearFront);
 float crest=exp(-pow((age-.019)/.028,2.));
 float light=alpha*energy*thin*occ*(.24+.76*tissue)*f.b*opacity*mix(1.,filled*(.88+.31*crest),study);

          float hot=pointerLight();
          light*=bloomPass>.5?.20*hot:1.+.60*hot;
          vec3 tint=mix(mix(vec3(.94,.979,1.),vec3(255.,215.,0.)/255.,useAccent),mix(vec3(.86,1.,.96),vec3(1.,.90,.48),useAccent),hot*(1.-bloomPass)*.54);
          if(pointPass>.5 && bloomPass<.5){
            float sheen=1.-smoothstep(.0,1.15,length(uv-vec2(-.26,.28)));
            tint=mix(tint*.93,mix(vec3(.96,1.,1.),vec3(1.,.87,.24),useAccent),.36*sheen);
          }
          float grade=useAccent*goldGrade();
          vec3 deep=mix(vec3(.48,.25,.03),vec3(.67,.37,.06),hot*.45);
          tint=mix(tint,deep,grade);
          if(bloomPass>.5) light*=1.-grade;
          color=vec4(tint*light,light);
}`.replace('smoothstep(1.6,.60,d)','(1.-smoothstep(.60,1.6,d))');
let curves,axes,meta,dots,ribbons,cams,program,curveTex,axisTex,metaTex,fieldTex,ribbonBuffer,dotBuffer,pushBuffer;
let frame=0,requested=0,profile=false,actualProfile=false,playing=!matchMedia('(prefers-reduced-motion: reduce)').matches,mode='fill',time=0,fillTime=0,inView=!embedded;
let transport=null,autoplayPending=playing,completedHold=false,wallSetting=.30;
function cue(){return window.studyClock.cue(timing,frame)}
let loading=0,ready=false,last=0,lastLabel='',visibleR=[],nSmall=0,nLarge=0,camera,forward;
let pushes,centers,spheres,renderedKey='',currentField=null,activeAssets=null,soloParticles=false;
const pointer={x:-1e4,y:-1e4,inside:false};let dragging=null;
// Decode the image, wall and depth mask together. Commit them only as a complete camera frame.
const frameBuffer=(()=>{
 const mobile=matchMedia('(pointer:coarse)').matches||navigator.deviceMemory<=4;
 const constrained=()=>navigator.connection?.saveData||['slow-2g','2g'].includes(navigator.connection?.effectiveType);
 const limit=(mobile?56:144)*1024*1024,cache=new Map();
 let target=window.gasStartFrame,direction=1,timer,epoch=0,moved=false;
 const stats={hits:0,misses:0,prefetchedHits:0,canceled:0};
 const key=n=>String(n).padStart(4,'0');
 const size=()=>(960*540+2*640*360)*4;
 const cameraIds=[0, 73, 75, 77, 79, 81, 83, 85, 87, 89, 91, 93, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 177, 180, 183, 186, 189, 192, 195, 198, 201, 204, 207, 210, 213, 216, 219, 222, 225, 228, 231, 234, 237, 240, 243, 246, 249, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300, 305, 310, 315, 320, 325, 330, 335, 340, 345, 350, 352, 354, 356, 358, 360, 362, 364, 366, 368, 370, 372, 374, 376, 378, 380, 382, 384, 386, 388, 390, 392, 394, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446];
 const neighbors=()=>{
  const limited=Number(navigator.connection?.downlink)>0&&navigator.connection.downlink<2;
  const offsets=constrained()?[1]:!moved||limited?[1,-1]:mobile?[1,-1,2]:[1,2,-1,3,-2,4,5];
  const index=cameraIds.indexOf(target);return offsets.map(d=>cameraIds[index+d*direction]).filter(n=>n!==undefined);
 };
 function remove(n,item){
  cache.delete(n);
  if(!item.ready){item.controller.abort();stats.canceled++}
 }
 function trim(){
  let cost=0;
  for(const item of cache.values())cost+=item.size;
  for(const [n,item] of cache){
   if(cost<=limit)break;
   if(n===target||n===frame||!item.ready)continue;
   remove(n,item);cost-=item.size;
  }
 }
 async function get(url,signal,priority){
  for(let attempt=0;attempt<2;attempt++){
   try{
    const pinned=window.previewBuffer.pinned(url);if(pinned)return pinned;const res=await fetch(url,{signal,priority,cache:'force-cache'});
    if(!res.ok)throw Error('Frame download failed: '+res.status);
    return await res.blob();
   }catch(err){if(signal.aborted||attempt)throw err}
  }
 }
 async function decode(blob,name){
  const url=URL.createObjectURL(blob),im=new Image();
  try{im.src=url+'#'+name;await im.decode();return im}
  finally{URL.revokeObjectURL(url)}
 }
 function entry(n,speculative=false){
  let item=cache.get(n);
  if(item){
   if(!speculative){stats.hits++;if(item.speculative&&item.ready)stats.prefetchedHits++;item.speculative=false}
   cache.delete(n);cache.set(n,item);return item.promise;
  }
  stats.misses++;
  const controller=new AbortController(),signal=controller.signal,k=key(n),priority=speculative?'low':'high';

  item={controller,size:size(n),ready:false,speculative};
  const directory=new URLSearchParams(location.search).get('field')==='fine'?'camera/':'camera-fast/';
  item.promise=get(directory+k+'.bin',signal,priority).then(async blob=>{
   const header=async at=>new DataView(await blob.slice(at,at+4).arrayBuffer()).getUint32(0,true);
   const plateEnd=4+await header(0),wallEnd=plateEnd+4+await header(plateEnd);
   if(plateEnd<=4||wallEnd<=plateEnd+4||wallEnd>=blob.size)throw Error('Incomplete camera '+k);
   return Promise.all([blob.slice(4,plateEnd),blob.slice(plateEnd+4,wallEnd),blob.slice(wallEnd)]
     .map(layer=>decode(layer,k)));
  }).then(([p,wall,field])=>{
   signal.throwIfAborted?.();item.ready=true;trim();return [p,wall,field];
  }).catch(err=>{if(cache.get(n)===item)cache.delete(n);controller.abort();throw err});
  cache.set(n,item);trim();return item.promise;
 }
 function aim(n){
  if(n!==target){direction=Math.sign(n-target);target=n;moved=true;epoch++;clearTimeout(timer)}
  const keep=new Set([target,...neighbors()]);
  for(const [i,item] of cache)if(!item.ready&&!keep.has(i))remove(i,item);
 }
 function warm(transporting){
  clearTimeout(timer);const generation=++epoch;
  async function run(){
   if(generation!==epoch||document.hidden||window.gasRecording)return;
   const nearby=neighbors();
   // Decode the two leading composite frames together in the high-resolution approach.
   if(target>=380&&target<446&&!mobile&&!constrained()){
    await Promise.allSettled(nearby.splice(0,2).map(n=>entry(n,true)));
   }
   for(const n of nearby){
    if(generation!==epoch||document.hidden||window.gasRecording)return;
    try{await entry(n,true)}catch{return}
   }
  }
  timer=setTimeout(run,transporting?0:moved?55:120);
 }
 return {entry,aim,warm,stats,inspect:()=>({keys:[...cache.keys()],ready:[...cache].filter(([,e])=>e.ready).map(([n])=>n),budget:limit,...stats})};
})();

// Each part contains complete original branches and seed indices. Missing rows stay transparent.
const gasDetail=(()=>{
 const state={parts:0,total:data.parts.length,bytes:0,complete:false};
 const unpackPart=async n=>{
  const file='stream-v017/detail-'+String(n).padStart(2,'0')+'.gz';const blob=window.previewBuffer.pinned(file);const res=blob?new Response(blob):await fetch(file,
                        {cache:'force-cache',priority:n?'low':'high'});
  if(!res.ok)throw Error('Detail download failed: '+res.status);
  const bytes=await new Response(res.body.pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
  const headerSize=new DataView(bytes).getUint32(0,true),decode=new TextDecoder();
  const header=JSON.parse(decode.decode(new Uint8Array(bytes,4,headerSize))),fields={};
  let off=4+headerSize;
  for(const [key,length] of Object.entries(header)){
   fields[key]=new Uint8Array(bytes,off,length);off+=Math.ceil(length/4)*4;
  }
  if(off!==bytes.byteLength)throw Error('Incomplete detail block');
  fields.ranges=JSON.parse(decode.decode(fields.ranges));return fields;
 };
 function restore(src,channels,stations,width,order){
  const count=src.byteLength/width/channels;
  const out=width===4?new Uint32Array(count*channels):new Uint16Array(count*channels);
  for(let ch=0;ch<channels;ch++){
   const low=ch*count,step=channels*count;
   for(let i=0;i<count;i+=stations){
    let v=0,d=0;
    for(let j=i;j<i+stations;j++){
     const a=low+j;
     let z=src[a]|(src[a+step]<<8);
     if(width===4)z|=(src[a+2*step]<<16)|(src[a+3*step]<<24);
     d=(order===2?d:0)+((z>>>1)^-(z&1))|0;v=v+d|0;
     out[j*channels+ch]=v;
    }
   }
  }
  return out;
 }
 const floats=b=>new Float32Array(b.buffer,b.byteOffset,b.byteLength/4);
 const ids=b=>new Uint32Array(b.buffer,b.byteOffset,b.byteLength/4);
 function textureRows(unit,tex,width,start,rows,values){
  gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,tex);
  gl.texSubImage2D(gl.TEXTURE_2D,0,0,start,width,rows,gl.RGBA,gl.FLOAT,values);
 }
 function apply(fields){
  if(fields.camera)cams=floats(fields.camera).slice();
  const curve=new Float32Array(restore(fields.curve,4,72,4,2).buffer);
  const normals=new Float32Array(restore(fields.axis,3,72,4,1).buffer);
  const arrival=restore(fields.arrival,1,72,2,1);
  const axis=new Float32Array(arrival.length*4),info=floats(fields.meta);
  for(let i=0;i<arrival.length;i++){
   axis[i*4]=normals[i*3];axis[i*4+1]=normals[i*3+1];axis[i*4+2]=normals[i*3+2];axis[i*4+3]=arrival[i]/65535;
  }
  let local=0;
  for(const [row,len] of fields.ranges[0]){
   const begin=local*8,count=len*8,start=row*8;
   const c=curve.subarray(begin*288,(begin+count)*288),a=axis.subarray(begin*288,(begin+count)*288),m=info.subarray(begin*4,(begin+count)*4);
   curves.set(c,start*288);axes.set(a,start*288);meta.set(m,start*4);
   textureRows(0,curveTex,576,row,len,c);textureRows(3,axisTex,576,row,len,a);textureRows(1,metaTex,8,row,len,m);
   measureBounds(start,Math.min(start+count,data.pathCount));local+=len;
  }
  for(const [name,dest] of [['dot',dots],['ribbon',ribbons]]){
   const index=ids(fields[name+'Ids']),values=floats(fields[name]);
   for(let j=0;j<index.length;j++)dest.set(values.subarray(j*8,j*8+8),index[j]*8);
  }
  gl.bindBuffer(gl.ARRAY_BUFFER,dotBuffer);gl.bufferSubData(gl.ARRAY_BUFFER,0,dots);
  lungParticles.install(fields.ranges[1],restore(fields.terminal,5,25,2,1));
  state.bytes+=data.parts[state.parts++];state.complete=state.parts===state.total;
  if(ready){visibility();draw()}
 }
 let busy=false,showProgress=false,failed=false;
 function status(){
  if(failed||window.gasRecording||window.stillJourney)return;
  const el=document.getElementById('status');
  el.textContent=showProgress&&!state.complete?'Refining lung detail '+Math.round(100*state.bytes/data.parts.reduce((a,b)=>a+b,0))+'%':'';
 }
 async function finish(){
  if(busy||state.complete)return;
  busy=true;failed=false;
  const timer=setTimeout(()=>{showProgress=true;status()},1200);
  try{
   while(state.parts<state.total&&!window.gasRecording&&!window.stillJourney){
    if(window.studyLayersActive===false || window.showPeptides===false&&!window.showRibbons || performance.now()-(window.studyInputTime||0)<500){
     await new Promise(resolve=>setTimeout(resolve,160));continue;
    }
    if(document.hidden){await new Promise(resolve=>document.addEventListener('visibilitychange',resolve,{once:true}));continue}
    await new Promise(resolve=>setTimeout(resolve,16));
    let block;
    try{block=await unpackPart(state.parts)}catch{block=await unpackPart(state.parts)}
    if(!window.gasRecording){apply(block);status()}
   }
   if(state.complete)performance.mark('lung-full-detail');
  }catch(err){
   failed=true;console.warn(err);const status=document.getElementById('status');
   const retry=document.createElement('button');retry.textContent='Retry lung detail';
   retry.onclick=()=>{retry.remove();finish()};status.replaceChildren(retry);
  }finally{clearTimeout(timer);busy=false}
 }
 return {state,first:()=>unpackPart(0),apply,finish,status};
})();

function makeShader(type,source){const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(shader));return shader}
function texture(unit,width,height,array){
 const tex=gl.createTexture();gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,tex);
 for(const p of [gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T])gl.texParameteri(gl.TEXTURE_2D,p,gl.CLAMP_TO_EDGE);
 for(const p of [gl.TEXTURE_MIN_FILTER,gl.TEXTURE_MAG_FILTER])gl.texParameteri(gl.TEXTURE_2D,p,array?gl.NEAREST:gl.LINEAR);
 if(array)gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA32F,width,height,0,gl.RGBA,gl.FLOAT,array);
 return tex;
}
function buffer(values){const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,values,gl.DYNAMIC_DRAW);return b}
const uniforms={};
function scalar(n,v){gl.uniform1f(uniforms[n],v)}
function attr(i,n,stride,offset){gl.enableVertexAttribArray(i);gl.vertexAttribPointer(i,n,gl.FLOAT,false,stride,offset);gl.vertexAttribDivisor(i,1)}
function coords(curve,t,out=[0,0,0,0]){
 const k=Math.min(70,Math.floor(t*71)),u=t*71-k,off=(curve*72+k)*4;
 for(let j=0;j<4;j++)out[j]=curves[off+j]+(curves[off+4+j]-curves[off+j])*u;
 return out;
}
function project(p,out=[0,0,0]){
 const x=p[0],y=p[1],z=p[2],m=camera;
 const w=m[12]*x+m[13]*y+m[14]*z+m[15];
 out[0]=(1+(m[0]*x+m[1]*y+m[2]*z+m[3])/w)*640;
 out[1]=(1-(m[4]*x+m[5]*y+m[6]*z+m[7])/w)*360;
 out[2]=w;
 return out;
}
let radiiOnScreen, ribbonGroups, visibleRibbonData;
function visibility(){
 if(!radiiOnScreen){
  radiiOnScreen=new Float32Array(data.pathCount);
  ribbonGroups=new Uint8Array(ribbons.length/8);
  visibleRibbonData=new Float32Array(ribbons.length);
 }
 const sx=Math.hypot(camera[0],camera[1],camera[2])*640;
 const sy=Math.hypot(camera[4],camera[5],camera[6])*360,scale=Math.max(sx,sy);
 const point=[0,0,0],screen=[0,0,0];
 radiiOnScreen.fill(0);
 for(let k=0;k<data.pathCount;k++){
  const i=k*4;if(!centers[i+3])continue;
  point[0]=centers[i];point[1]=centers[i+1];point[2]=centers[i+2];
  project(point,screen);
  const size=spheres[k],extent=size*scale/Math.max(.002,screen[2]-size);
  if(screen[2]+size<.001||screen[0]+extent<0||screen[0]-extent>W||screen[1]+extent<0||screen[1]-extent>H)continue;
  radiiOnScreen[k]=centers[i+3]*sx/Math.max(.0001,screen[2]);
 }
 nSmall=0;nLarge=0;
 for(let j=0;j<ribbonGroups.length;j++){
  const i=j*8,px=radiiOnScreen[ribbons[i]];
  if(!ribbons[i+7]||px<.21){ribbonGroups[j]=0;continue;}
  if(px>1.6){ribbonGroups[j]=2;nLarge++;}else{ribbonGroups[j]=1;nSmall++;}
 }
 // Keep the original order within both shader batches.
 let small=0,large=nSmall*8;
 for(let j=0;j<ribbonGroups.length;j++){
  const group=ribbonGroups[j];if(!group)continue;
  const at=group===1?small:large,from=j*8;
  for(let v=0;v<8;v++)visibleRibbonData[at+v]=ribbons[from+v];
  if(group===1)small+=8;else large+=8;
 }
 visibleR=visibleRibbonData.subarray(0,large);
 gl.bindBuffer(gl.ARRAY_BUFFER,ribbonBuffer);gl.bufferData(gl.ARRAY_BUFFER,visibleR,gl.DYNAMIC_DRAW);
}
function applyView(){
 const view=$('view').value,wall=cue().wall*wallSetting;
 soloParticles=embedded?soloParticles:view==='particles';
 const plateVisible=view==='ct'||view==='particles';
 $('plate').style.visibility=plateVisible?'visible':'hidden';$('anatomy').style.visibility=plateVisible?'visible':'hidden';
 $('plate').style.opacity=soloParticles&&frame>0?.18:1;
 $('anatomy').style.opacity=soloParticles?0:wall;$('maskBase').hidden=view!=='mask'||frame===0;
 $('strength').disabled=cue().wall===0;$('strength').value=Math.round(100*wall);
 canvas.style.visibility=view==='mask'?'hidden':'visible';$('strengthValue').textContent=Math.round(100*wall)+'%';$('mistValue').textContent=$('mist').value+'%';
 updateScale();
}
function updateScale(){
     if(!activeAssets)return;
     window.showGasScale(frame);window.syncGasControls(frame,mode,soloParticles);
 }
function keyFor(f,p){return p?'profile':String(f).padStart(4,'0')}
async function select(f,p=profile,source='seek'){
 requested=Math.max(0,Math.min(446,Math.round(f)));profile=p;
 if(source==='seek'){transport=null;autoplayPending=false}
 $('timeline').value=requested;$('camera').setAttribute('aria-pressed',String(!p));$('profile').setAttribute('aria-pressed',String(p));
 const generation=++loading,k=keyFor(requested,p),chosen=requested;
 frameBuffer.aim(chosen);
 let bundle;
 try{
  const next=frameBuffer.entry(chosen);
  if(chosen>=380&&chosen<=446)frameBuffer.warm(!!transport);
  bundle=await next;
 }catch(e){if(e.name==='AbortError'||generation!==loading)return false;throw e}
 if(generation!==loading||window.gasRecording||(pendingFrame!==null&&pendingFrame!==chosen&&source!=='load'))return false;
 window.beforeGasSwap?.(frame,chosen);const previous=frame;
 frame=chosen;actualProfile=p;activeAssets=bundle;renderedKey=k;
 if(frame<=timing.holdEnd){fillTime=frame/timing.fps;completedHold=false}
 else if(previous<=timing.holdEnd||source==='transport'){fillTime=timing.clockAt(frame);completedHold=true}
 const idx=p?447:frame;camera=cams.subarray(idx*16,idx*16+16);
 const z=p?0:Math.max(0,Math.min(1,Math.log(window.airwayWidths[396]/window.airwayWidths[frame])/Math.log(window.airwayWidths[396]/.12)));
 scalar('distalZoom',z*z*(3-2*z));
 let fwd=p?[1,0,0]:Array.from(camera.subarray(12,15));const norm=Math.hypot(...fwd);forward=fwd.map(x=>x/norm);
 const transposed=new Float32Array(16);for(let i=0;i<4;i++)for(let j=0;j<4;j++)transposed[i*4+j]=camera[j*4+i];
 gl.uniformMatrix4fv(uniforms.camera,false,transposed);gl.uniform3fv(uniforms.forward,forward);
 gl.activeTexture(gl.TEXTURE2);gl.bindTexture(gl.TEXTURE_2D,fieldTex);gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL,gl.NONE);
 gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,bundle[2]);currentField=bundle[2];
 for(const [id,img] of [['plate',bundle[0]],['anatomy',bundle[1]]]){
   const current=$(id);if(current!==img){img.id=id;img.alt='';img.draggable=false;current.replaceWith(img);}
 }
 if(!window.journeyOutside)$('frameLabel').textContent='F'+String(frame).padStart(4,'0')+' / 0446';$('hud').textContent=p?'SAGITTAL  /  UPPER AIRWAY':'F'+k;
 for(const btn of $('jump').children)btn.setAttribute('aria-pressed',String(!p&&+btn.dataset.f===frame));
 visibility();applyView();ready=true;draw();gasDetail.status();frameBuffer.warm(!!transport);
 if(embedded)parent.postMessage({airway:'frame',frame,transport:source==='transport'},'*');
 return true;
}
let goldTexture, goldMap;
function updateGoldMap(){
 const optics=window.journeyParticles;
 const map=optics.luminance(window.journeyOutside?$('laterPlate'):$('plate'));
 if(!goldTexture){
   goldTexture=gl.createTexture();
   gl.activeTexture(gl.TEXTURE9);gl.bindTexture(gl.TEXTURE_2D,goldTexture);
   gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
   gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
   gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
   gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
 }
 if(goldMap===map)return;
 goldMap=map;
 gl.activeTexture(gl.TEXTURE9);gl.bindTexture(gl.TEXTURE_2D,goldTexture);
 gl.texImage2D(gl.TEXTURE_2D,0,gl.R8,optics.mapWidth,optics.mapHeight,0,gl.RED,gl.UNSIGNED_BYTE,
   map||new Uint8Array(optics.mapWidth*optics.mapHeight));
}
function draw(){
 if(!ready)return;
 updateGoldMap();
 gl.clear(gl.COLOR_BUFFER_BIT);const state=cue();breath.prepare(frame);if(!window.journeyGasBridge)breath.plates();breath.uniforms(program);
 const focus=window.cursorForCanvas(canvas);
    function gasPass(bloom){
      scalar('bloomPass',bloom);gl.uniform4fv(uniforms.glowFocus,focus);
    gl.uniform4fv(uniforms.flight,window.gasFlight||[0,0,0,0]);
 scalar('useAccent',window.flowAccent?1:0);
 scalar('clock',time);scalar('study',1);scalar('front',state.front);
 scalar('clearFront',state.clear);
 scalar('mist',+$('mist').value/100);
 scalar('opacity',state.gas*(window.journeyRibbonGain??1)*($('view').value==='gas'?1.25:1.05));
 scalar('pointPass',0);gl.disableVertexAttribArray(2);gl.vertexAttrib4f(2,0,0,0,0);gl.bindBuffer(gl.ARRAY_BUFFER,ribbonBuffer);
 for(const [count,offset,segments] of [[nSmall,0,6],[nLarge,nSmall,70]]){
  if(!count||soloParticles||window.showRibbons===false)continue;attr(0,4,32,offset*32);attr(1,4,32,offset*32+16);gl.uniform1i(uniforms.segments,segments);gl.drawArraysInstanced(gl.TRIANGLE_STRIP,0,2*(segments+1),count)
 }
 if(window.showPeptides===false)return;
 scalar('opacity',state.gas*($('view').value==='gas'?1.25:1.05));scalar('pointPass',1);gl.bindBuffer(gl.ARRAY_BUFFER,dotBuffer);attr(0,4,32,0);attr(1,4,32,16);
 gl.bindBuffer(gl.ARRAY_BUFFER,pushBuffer);attr(2,4,16,0);gl.drawArraysInstanced(gl.TRIANGLE_STRIP,0,4,data.particleCount);
 lungParticles.draw(state,bloom,focus);}
    if(state.gas>.001 && (window.showRibbons!==false||window.showPeptides!==false))gasPass(0);
    if(state.gas>.001 && focus[3]>.002){
      const h=canvas.height,w=canvas.width,r=Math.ceil(h*focus[2])+2;
      gl.enable(gl.SCISSOR_TEST);
      gl.scissor(Math.floor(focus[0]*w)-r,Math.floor((1-focus[1])*h)-r,2*r+1,2*r+1);
      gl.blendFunc(gl.ONE,window.flowAccent?gl.ONE_MINUS_SRC_ALPHA:gl.ONE);
      try{gasPass(1);}finally{gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);gl.disable(gl.SCISSOR_TEST);}
    }
 $('stage').dataset.nativeFrame=String(frame);$('stage').dataset.motionClock=time.toFixed(6);
 const caption=state.label;
 if(caption!==lastLabel){$('phase').textContent=caption;lastLabel=caption;if(embedded)parent.postMessage({airway:'phase',caption},'*')}
}
function chooseMode(value){if(!['steady','fill','zoom'].includes(value))return;mode=value;for(const k of ['steady','fill','zoom'])$(k).setAttribute('aria-pressed',String(k===mode));draw()}
function play(value){setPlaying(value)}
    function setPlaying(value){
 const resume=value&&!playing;playing=value;
 transport=null; autoplayPending=false;
 $('play').textContent=playing?'Pause':'Play';$('play').setAttribute('aria-pressed',String(playing));
}
async function replayOpening(end=174){
 await play(false);autoplayPending=false;pendingFrame=null;transport=null;completedHold=false;chooseMode('fill');setPlaying(true);
 const player={position:0,end,busy:true};transport=player;
 await select(0,actualProfile,'transport');player.busy=false;
}
function advanceCamera(dt){
 const player=transport;if(!player)return;
 if(player.busy)return;
 player.position=Math.min(player.end,frame+1,player.position+dt*timing.fps);
 const n=Math.floor(player.position);if(player.busy||n===frame)return;
 player.busy=true;
 select(n,actualProfile,'transport').then(ok=>{
  if(transport===player&&ok&&n===player.end){transport=null;completedHold=true}
 }).catch(fail).finally(()=>{player.busy=false});
}
let requestedRaf=0,pendingFrame=null,scrubBusy=false,scrollTarget=0;
function scrub(n){
 n=Math.max(0,Math.min(446,Math.round(n)));
 if(!ready){window.gasEarlySeek(n);return}
 if(pendingFrame!==n&&requested!==n){loading++;frameBuffer.aim(n)}
 transport=null;autoplayPending=false;
 scrollTarget=Math.max(0,Math.min(446,Math.round(n)));pendingFrame=scrollTarget;
 if(requestedRaf||scrubBusy)return;
 requestedRaf=requestAnimationFrame(async()=>{
  requestedRaf=0;scrubBusy=true;
  try{while(pendingFrame!==null){const next=pendingFrame;pendingFrame=null;await select(next,false)}}
  catch(e){fail(e)}finally{scrubBusy=false}
 });
}
function fail(e){window.useStillJourney();console.error(e)}
const breath=(()=>{
 const origin=performance.now(),period=5.2,cols=64,rows=40,stride=cols*rows*4;
 const locations=new WeakMap(),current=new Float32Array(stride),levels=new Float32Array(2);
 let slices,regions,tex,region=[0,0,1,1],look='off',at=-1,seconds=0,phase=0,basal=0,costal=0,speed=1,lastScreen=null,background=null;
 function weights(){
  const live=!!slices&&at>=0&&window.airwayWidths[at]>.162;
  levels[0]=live?(look==='dome'?basal:look==='both'?.86*basal:0):0;
  levels[1]=live?(look==='ribs'?costal:look==='both'?.85*costal:0):0;
 }
 function prepare(f){
  if(!tex){
   tex=gl.createTexture();gl.activeTexture(gl.TEXTURE8);gl.bindTexture(gl.TEXTURE_2D,tex);
   for(const k of [gl.TEXTURE_MIN_FILTER,gl.TEXTURE_MAG_FILTER])gl.texParameteri(gl.TEXTURE_2D,k,gl.LINEAR);
   for(const k of [gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T])gl.texParameteri(gl.TEXTURE_2D,k,gl.CLAMP_TO_EDGE);
   gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA16F,cols,rows,0,gl.RGBA,gl.FLOAT,null);
  }
  if(at===f)return;
  at=f;weights();
  if(!slices||window.airwayWidths[f]<=.162)return;
  region=regions.subarray(f*4,f*4+4);
  for(let i=0,k=f*stride;i<stride;i++)current[i]=slices[k+i]/128;
  gl.activeTexture(gl.TEXTURE8);gl.bindTexture(gl.TEXTURE_2D,tex);
  gl.texSubImage2D(gl.TEXTURE_2D,0,0,0,cols,rows,gl.RGBA,gl.FLOAT,current);
 }
 function amount(){return Math.max(levels[0],levels[1])}
 function kernel(f){const d=f*f*f/6,a=(1-f)**3/6;return [a,(3*f*f*f-6*f*f+4)/6,(-3*f*f*f+3*f*f+3*f+1)/6,d]}
 function offset(x,y){
  if(!amount())return [0,0];
  const u=(x-region[0])/region[2],v=(y-region[1])/region[3];
  if(u<0||v<0||u>1||v>1)return [0,0];
  const px=u*cols-.5,py=v*rows-.5,ix=Math.floor(px),iy=Math.floor(py),kx=kernel(px-ix),ky=kernel(py-iy);
  let dx=0,dy=0;
  for(let j=0;j<4;j++)for(let i=0;i<4;i++){
   const col=Math.max(0,Math.min(cols-1,ix+i-1)),row=Math.max(0,Math.min(rows-1,iy+j-1)),k=(row*cols+col)*4;
   const w=kx[i]*ky[j];
   dx+=w*(current[k]*levels[0]+current[k+2]*levels[1]);dy+=w*(current[k+1]*levels[0]+current[k+3]*levels[1]);
  }
  return [dx/1920,dy/1080];
 }
 function toSource(x,y){
  const uv=[x/W,y/H],a=offset(...uv),d=offset(uv[0]-a[0],uv[1]-a[1]);
  return [x-W*d[0],y-H*d[1]];
 }
 let lastBreathTick=performance.now();
 function tick(now,advancing=playing){
  const elapsed=Math.max(0,Math.min(.075,(now-lastBreathTick)/1000));lastBreathTick=now;
  if(advancing)seconds+=elapsed*window.studyClock.options.breathRate;$('stage').dataset.breathSeconds=seconds.toFixed(6);$('stage').dataset.playing=String(advancing);phase=((seconds/period)%1+1)%1;
  const theta=2*Math.PI*phase,delay=1-Math.cos(theta);
  basal=.5-.5*Math.cos(theta+.31*delay);
  costal=.5-.5*Math.cos(theta+.09*delay);
  speed=1+.08*Math.sin(theta+.24*delay);
  if(camera)prepare(frame);
  weights();if(pointer.inside&&lastScreen)[pointer.x,pointer.y]=toSource(...lastScreen);
 }
 function uniforms(pipe){
  let loc=locations.get(pipe);
  if(!loc){
   loc={flightRadius:gl.getUniformLocation(pipe,'flightRadius'),measuredFlight:gl.getUniformLocation(pipe,'measuredFlight'),flightCamera:gl.getUniformLocation(pipe,'flightCamera'),flight:gl.getUniformLocation(pipe,'flight'),palette:gl.getUniformLocation(pipe,'useAccent'),gain:gl.getUniformLocation(pipe,'breathLevels'),rect:gl.getUniformLocation(pipe,'breathRegion')};
   gl.uniform1i(gl.getUniformLocation(pipe,'breathMap'),8);locations.set(pipe,loc);
  }
  gl.uniform1i(loc.measuredFlight,window.gasFlightCamera?1:0);
        if(window.gasFlightCamera){gl.uniformMatrix4fv(loc.flightCamera,false,window.gasFlightCamera);gl.uniform2fv(loc.flightRadius,window.gasFlightRadius);}
        gl.uniform4fv(loc.flight,window.gasFlight||[0,0,0,0]);gl.uniform1f(loc.palette,window.flowAccent?1:0);gl.uniform2fv(loc.gain,levels);gl.uniform4fv(loc.rect,region);
 }
  function buildBackground(){
  const vert='#version 300 es\nvoid main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);gl_Position=vec4(p*2.-1.,0.,1.);}';
  const frag=`#version 300 es
   precision highp float;
   ${breathFieldShader}
   uniform sampler2D ctImage,wallImage;
   uniform float useAccent; uniform vec2 opacity;
   out vec4 color;
   void main(){
    vec2 uv=vec2(gl_FragCoord.x/960.,1.-gl_FragCoord.y/540.);
    vec2 d=breathOffset(uv);
    float feather=smoothstep(0.,.24,length(d*vec2(1920.,1080.)));
    if(feather<=0.)discard;
    vec2 source=uv-breathOffset(uv-d);
    vec3 ct=mix(vec3(23./255.),texture(ctImage,source).rgb,opacity.x);
    vec3 tissue=mix(ct,texture(wallImage,source).rgb,opacity.y);
    color=vec4(mix(tissue,vec3(dot(tissue,vec3(.2126,.7152,.0722))),useAccent)*feather,feather);
   }`;
  const prog=gl.createProgram();
  for(const [type,code] of [[gl.VERTEX_SHADER,vert],[gl.FRAGMENT_SHADER,frag]]){
   const shader=makeShader(type,code);gl.attachShader(prog,shader);gl.deleteShader(shader);
  }
  gl.linkProgram(prog);if(!gl.getProgramParameter(prog,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(prog));
  gl.useProgram(prog);
  const textures=['ctImage','wallImage'].map((name,i)=>{
   const tex=gl.createTexture();gl.activeTexture(gl.TEXTURE6+i);gl.bindTexture(gl.TEXTURE_2D,tex);
   for(const param of [gl.TEXTURE_MIN_FILTER,gl.TEXTURE_MAG_FILTER])gl.texParameteri(gl.TEXTURE_2D,param,gl.LINEAR);
   for(const param of [gl.TEXTURE_WRAP_S,gl.TEXTURE_WRAP_T])gl.texParameteri(gl.TEXTURE_2D,param,gl.CLAMP_TO_EDGE);
   gl.uniform1i(gl.getUniformLocation(prog,name),6+i);return tex;
  });
  return {prog,textures,vao:gl.createVertexArray(),alpha:gl.getUniformLocation(prog,'opacity'),assets:null};
 }
 function plates(){
  if(!amount()||!activeAssets||$('view').value==='mask')return;
  background??=buildBackground();const bg=background;
  gl.useProgram(bg.prog);uniforms(bg.prog);
  if(bg.assets!==activeAssets){
   for(let i=0;i<2;i++){
    gl.activeTexture(gl.TEXTURE6+i);gl.bindTexture(gl.TEXTURE_2D,bg.textures[i]);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,activeAssets[i]);
   }
   bg.assets=activeAssets;
  }
  gl.uniform2f(bg.alpha,Number($('plate').style.opacity),Number($('anatomy').style.opacity));
  gl.bindVertexArray(bg.vao);gl.drawArrays(gl.TRIANGLES,0,3);gl.bindVertexArray(null);gl.useProgram(program);
 }

 function choose(name){
  if(!['off','dome','ribs','both'].includes(name))return;
  look=name;$('breathLook').value=name;for(const el of document.querySelectorAll('[data-look]'))el.setAttribute('aria-pressed',String(el.dataset.look===name));
  tick(performance.now(),playing);if(ready)draw();
 }
 const loaded=fetch('breath-regional-v003.gz').then(async res=>{
  if(!res.ok)throw Error('Could not load the registered breathing study.');
  const raw=await new Response(res.body.pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
  if(raw.byteLength!==447*(16+stride*2))throw Error('Incomplete breathing study.');
  regions=new Float32Array(raw,0,447*4);slices=new Int16Array(raw,447*16);
  for(let i=stride;i<slices.length;i++)slices[i]+=slices[i-stride];
  at=-1;if(camera){prepare(frame);if(ready)draw()}
 }).catch(e=>{choose('off');$('status').textContent=e.message;console.warn(e)});
 const api={prepare,uniforms,plates,tick,toSource,choose,loaded,offset,
  track(x,y){lastScreen=[x,y];return toSource(x,y)},sample(t){seconds=t;tick(performance.now(),false)},
  get speed(){return speed},get enabled(){return look!=='off'},
  inspect:()=>({look,origin,seconds,phase,frame:at,levels:[...levels],loaded:!!slices,speed})};
 window.breathStudy=api;
 for(const b of document.querySelectorAll('[data-look]'))b.onclick=()=>choose(b.dataset.look);
 const preferred=new URLSearchParams(location.search).get('look');
 choose(preferred||(matchMedia('(prefers-reduced-motion: reduce)').matches?'off':'both'));
 return api;
})();

function raf(now){
 if(window.stillJourney)return;if(!last)last=now;const dt=Math.min(.075,(now-last)/1000);last=now;
 if(ready&&window.studyLayersActive!==false&&inView&&!document.hidden&&!window.captureMode&&(!window.journeyOutside||window.journeyGasBridge)){
  if(playing)window.studyClock.advance(dt);
  breath.tick(now,playing);
  if(playing){
   if(autoplayPending&&frame===0){autoplayPending=false;transport={position:0,end:timing.holdEnd,busy:false}}
   if(!breath.enabled)time+=dt*window.studyClock.speed(now);
   if(transport)advanceCamera(dt);
   else if(mode==='fill'&&(frame>timing.holdEnd||completedHold))fillTime+=dt;
  }
  if(breath.enabled&&(playing||window.journeySequencePlaying))time+=dt*breath.speed*window.studyClock.speed(now);
  const returning=window.lastPush;cursorStep(dt);if(playing||pointer.inside||returning||window.lastPush||lungParticles.relaxing())draw();
 }
 requestAnimationFrame(raf)
}
function measureBounds(start,end){
 for(let k=start;k<end;k++){
  const off=k*72*4,lo=[Infinity,Infinity,Infinity],hi=[-Infinity,-Infinity,-Infinity];let r=0;
  for(let j=0;j<72;j++){for(let a=0;a<3;a++){const val=curves[off+4*j+a];lo[a]=Math.min(lo[a],val);hi[a]=Math.max(hi[a],val)}r=Math.max(r,curves[off+4*j+3])}
  for(let a=0;a<3;a++)centers[k*4+a]=(lo[a]+hi[a])*.5;centers[k*4+3]=r;spheres[k]=Math.hypot(...lo.map((x,a)=>hi[a]-x))*.5+r;
 }
}
async function init(){
 if(!gl)throw Error('This viewer requires WebGL 2. The accompanying movies work without it.');
 const boot=gasDetail.first();
 frameBuffer.entry(window.gasStartFrame).catch(()=>{});
 boot.catch(()=>{});
 curves=new Float32Array(data.rows*8*72*4);axes=new Float32Array(curves.length);
 meta=new Float32Array(data.rows*32);dots=new Float32Array(data.particleCount*8);
 ribbons=new Float32Array(data.ribbonCount*8);
 program=gl.createProgram();gl.attachShader(program,makeShader(gl.VERTEX_SHADER,vertex));gl.attachShader(program,makeShader(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);
 if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));gl.useProgram(program);
 for(const n of ['bloomPass','glowFocus','goldLuminance','flight','useAccent','curves','info','bounds','axisField','camera','forward','clock','front','clearFront','study','pointPass','mist','distalZoom','segments','opacity'])uniforms[n]=gl.getUniformLocation(program,n);
 for(const [i,n] of ['curves','info','bounds','axisField'].entries())gl.uniform1i(uniforms[n],i);
 gl.uniform1i(uniforms.goldLuminance,9);
 curveTex=texture(0,8*72,data.rows,curves);metaTex=texture(1,8,data.rows,meta);fieldTex=texture(2);axisTex=texture(3,8*72,data.rows,axes);
 ribbonBuffer=buffer(0);dotBuffer=buffer(dots);pushes=new Float32Array(data.particleCount*4);pushBuffer=buffer(pushes);
 gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);gl.clearColor(0,0,0,0);
 centers=new Float32Array(data.pathCount*4);spheres=new Float32Array(data.pathCount);
 await lungParticles.initialize(gl);
 gasDetail.apply(await boot);
 const entry=new URLSearchParams(location.search);
 if(entry.has('paused')){playing=false;autoplayPending=false}
 if(!embedded&&['zoom','fill','steady'].includes(entry.get('mode')))chooseMode(entry.get('mode'));
 if(!entry.has('mode'))chooseMode('zoom');
 const first=embedded?0:window.gasStartFrame;
 if(first)autoplayPending=false;
 const autoStart=false;playing=false;autoplayPending=false;setPlaying(false);
 let firstTarget=first;
 do {firstTarget=embedded?0:window.gasStartFrame;await select(firstTarget,false,'load')}
 while(!window.gasRecording&&firstTarget!==window.gasStartFrame&&!embedded);
 if(window.gasRecording)return;
 if(!embedded&&mode==='fill'&&entry.has('fill')&&first>timing.holdEnd){const t=Number(entry.get('fill'));if(Number.isFinite(t)){fillTime=Math.min(39.99,Math.max(0,t));draw()}}
 window.studyInputTime=performance.now();performance.mark('lung-interactive');gasDetail.finish();if(autoStart){setPlaying(true);transport=null;autoplayPending=false}
 requestAnimationFrame(raf);
 if(embedded)parent.postMessage({airway:'ready'},'*');
}
function pointerPos(e){const b=$('stage').getBoundingClientRect();return breath.track((e.clientX-b.left)*W/b.width,(e.clientY-b.top)*H/b.height)}
$('timeline').oninput=e=>scrub(+e.target.value);for(const btn of $('jump').children)btn.onclick=()=>select(+btn.dataset.f,false).catch(fail);
$('profile').onclick=()=>select(requested,true).catch(fail);$('camera').onclick=()=>select(requested,false).catch(fail);
$('steady').onclick=()=>chooseMode('steady');$('fill').onclick=()=>chooseMode('fill');$('zoom').onclick=()=>chooseMode('zoom');$('play').onclick=()=>play(!playing&&!pendingNative);$('replay').onclick=()=>replayOpening().catch(fail);
$('loopReplay').onclick=()=>{if(frame<=timing.holdEnd){replayOpening(timing.holdEnd).catch(fail);return}transport=null;fillTime=0;chooseMode('fill');play(true);draw()};
$('strength').oninput=()=>{const factor=cue().wall;if(factor>0)wallSetting=Math.min(1,+$('strength').value/(100*factor));applyView();draw()};
for(const id of ['mist','view'])$(id).oninput=()=>{applyView();draw()};
$('export').onclick=e=>{if(!ready){e.preventDefault();return}draw();e.currentTarget.href=canvas.toDataURL('image/png');e.currentTarget.download='Gas_'+renderedKey+'_'+mode+'_'+Math.round(time*1000)+'ms.png'};
window.bindGasInputs({scrub,play,playing:()=>playing,frame:()=>frame,requested:()=>requested,pointer,pointerPos});
window.airwayStudy={get ready(){return ready},get frame(){return frame},redraw:draw,detail:gasDetail.state,buffer:frameBuffer.inspect,select,play,mode:chooseMode,replayOpening,setTime(t,depthTime=t){time=t;fillTime=depthTime;draw()},setPointer(x,y){pointer.x=x;pointer.y=y;pointer.inside=true;cursorStep(1/12);draw()},release(){pointer.inside=false},inspect(){return {ready,frame,profile:actualProfile,clock:time,fillTime,front:cue().front,wallOpacity:Number($('anatomy').style.opacity),gasOpacity:cue().gas,transport:!!transport,mode,playing,key:renderedKey,count:data.particleCount+lungParticles.capacity,peripheralCapacity:lungParticles.capacity,inherited:data.oldCount,drawn:nSmall+nLarge,displaced:window.lastPush||0,error:gl?.getError()}},
 snapshot(){const c=document.createElement('canvas');c.width=canvas.width;c.height=canvas.height;const ctx=c.getContext('2d');ctx.fillStyle='#171717';ctx.fillRect(0,0,c.width,c.height);if(['ct','particles'].includes($('view').value)){ctx.globalAlpha=Number($('plate').style.opacity);ctx.drawImage(activeAssets[0],0,0,c.width,c.height);ctx.globalAlpha=Number($('anatomy').style.opacity);ctx.drawImage(activeAssets[1],0,0,c.width,c.height);ctx.globalAlpha=1}if($('view').value==='mask'){if(frame!==0)ctx.drawImage($('maskBase'),0,0,c.width,c.height)}else ctx.drawImage(canvas,0,0);return c.toDataURL('image/jpeg',.94)},
 homes(){return Array.from(dots.subarray(0,16))},positions(){return [33,293,718,1642,2916].map(j=>{const a=j*8,k=dots[a],t=(dots[a+1]+time*Math.max(.072,Math.min(.4,.0055/Math.max(.001,meta[k*4+2])))*dots[a+5])%1;return project(coords(k,t))})}};
if(embedded)window.addEventListener('message',e=>{
 if(e.source!==parent||!e.data||e.data.airway!=='update')return;
 const m=e.data;
 if(typeof m.soloParticles==='boolean'){soloParticles=m.soloParticles;applyView();draw()}
 if(m.cancelTransport){transport=null;autoplayPending=false}
 if(Number.isFinite(m.frame)&&!(m.initial&&m.frame===0))scrub(m.frame);
 if(typeof m.visible==='boolean')inView=m.visible;
 if(typeof m.playing==='boolean')play(m.playing);
 if(typeof m.mode==='string')chooseMode(m.mode);
 if(m.replayOpening)replayOpening().catch(fail);
 if(m.replayFill)$('loopReplay').click();
 if(Number.isFinite(m.fillTime)){fillTime=m.fillTime;draw()}
 if(Array.isArray(m.pointer)){[pointer.x,pointer.y]=m.pointer;pointer.inside=true}
 else if(m.pointer===null)pointer.inside=false;
});
/* Ruler belongs to the shared viewer. */

new ResizeObserver(updateScale).observe($('stage'));
init().then(()=>window.gasReady()).catch(fail);
