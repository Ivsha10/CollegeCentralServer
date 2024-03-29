var coaches = [
    { college: 'Aquinas College', coach: 'Luke Ruff', email: 'lar005@aquinas.edu' },
    { college: 'Arizona Christian University', coach: 'Ted Krzywiecki', email: 'ted.krzywiecki@arizonachristian.edu' },
    { college: 'Ave Maria University', coach: 'Cesar Markovic', email: 'Cesar.Markovic@avemaria.edu' },
    { college: 'Avila University', coach: 'Robert Kelly', email: 'robert.kelly@avila.edu' },
    { college: 'Baker University', coach: 'Nick Aguilar', email: 'nick.aguilar@bakeru.edu' },
    { college: 'Bellevue University', coach: 'Mark Heath-Preston', email: 'mark.heath-preston@bellevue.edu' },
    { college: 'Benedictine College', coach: 'John Sosa', email: 'jsosa@benedictine.edu' },
    { college: 'Bethany College', coach: 'Dane Straight', email: 'straightdi@bethanylb.edu' },
    { college: 'Bethel (TN)', coach: 'Malang Jarju', email: 'jarjum@bethelu.edu' },
    { college: 'Bethel College', coach: 'Luka Milicevic', email: 'lmilicevic@bethelks.edu' },
    { college: 'Bethel University', coach: 'Jeremy Iwaszkowiec', email: 'j-iwaszkowiec@bethel.edu' },
    { college: 'Blue Mountain Christian (MS)', coach: 'Michael Ariza', email: 'mazira@bmc.edu' },
    { college: 'Bluefield University (VA)', coach: 'Gabriel Blackman', email: 'gblakman@bluefield.edu' },
    { college: 'Brescia University (KY)', coach: 'Dale Armistead', email: 'dale.armistead@brescia.edu' },
    { college: 'Brewton-Parker College (GA)', coach: 'Bob Neumann', email: 'rneumann@bpc.edu' },
    { college: 'Briar Cliff University', coach: 'Teren Schuster', email: 'teren.schuster@briarcliff.edu' },
    { college: 'Bryan College', coach: 'Jeremy Davidson', email: 'jeremy.davidson@bryan.edu' },
    { college: 'Bushnell University', coach: 'Joao Ehlers', email: 'ehlers@bushnell.edu' },
    { college: 'Cal Maritime', coach: 'Mike Carvalho', email: 'mcarvalho@csum.edu' },
    { college: 'Calumet College of Saint Joseph', coach: 'Javier Martin', email: 'jmarin1@ccsj.edu' },
    { college: 'Campbellsville University', coach: 'Adam Preston', email: 'awpreston@campbellsville.edu' },
    { college: 'Carroll College', coach: 'Austin Schick', email: 'ashick@carroll.edu' },
    { college: 'Central Baptist College', coach: 'Dylan Perdue', email: 'dperdue@cbc.edu' },
    { college: 'Central Christian College', coach: 'Aaron Hoxie', email: 'aaron.hoxie@centralchristian.edu' },
    { college: 'Central Methodist University', coach: 'Adam Galla', email: 'agalla@centralmethodist.edu' },
    { college: 'Clarke University', coach: 'Matt 0’Toole', email: 'mtoole@clark.edu' },
    { college: 'Cleary University', coach: 'Dan Bulley', email: 'dbulley@cleary.edu' },
    { college: 'College of Idaho', coach: 'Thom Baker', email: 'tbaker@collegeofidaho.edu' },
    { college: 'Columbia College', coach: 'Michael Casper', email: 'columbiansoccer@gmail.com' },
    { college: 'Columbia International University', coach: 'Bill Brindley', email: 'Bill.brindley@ciu.edu' },
    { college: 'Concordia University (NE)', coach: 'Jason.Weides@cune.edu', email: 'Jason.Weides@cune.edu' },
    { college: 'Concordia University Ann Arbor', coach: 'Jason Clare', email: 'Jason.Clare@cuaa.edu' },
    { college: 'Corban University', coach: 'Corbin Bowers', email: 'cbowers@corban.edu' },
    { college: 'Cornerstone University', coach: 'Stephen Herdsman', email: 'stephen.herdsman@cornerstone.edu' },
    { college: 'Culver-Stockton College', coach: 'Tyler Hamilton', email: 'thamilton@culver.edu' },
    { college: 'Cumberland University', coach: 'Shane Keely', email: 'skeely@cumberland.edu' },
    { college: 'Dakota Wesleyan (SD)', coach: 'Nicolas Reinhard', email: 'Nicolas.Reinhard@dwu.edu' },
    { college: 'Dalton State (GA)', coach: 'Saif Alsafeer', email: 'salsafeer@daltonstate.edu' },
    { college: 'Doane (NE)', coach: 'Tony Odorisio', email: 'tony.odorisio@doane.edu' },
    { college: 'Dordt (IA)', coach: 'Eric Bourdo', email: 'Eric.bourdo@dordt.edu' },
    { college: 'Eastern Oregon', coach: 'Jessy Watson', email: 'watsonja@eou.edu' },
    { college: 'Embry-Riddle (Ariz.)', coach: 'David Gregson', email: 'gregsond@erau.edu' },
    { college: 'Evangel (MO)', coach: 'Kyle Beard', email: 'beardk@evangel.edu' },
    { college: 'Evergreen (WA)', coach: 'Steve Schmidt', email: 'schmidts@evergreen.edu' },
    { college: 'Faulkner (AL)', coach: 'Gabriel De Queiroz', email: 'gqueiroz@faulkner.edu' },
    { college: 'Fisher (MA)', coach: 'John Del Valle', email: 'jdelvalle@fisher.edu' },
    { college: 'Fish (TN)', coach: 'Joseph Tibbs', email: 'jtibbs@fisk.edu' },
    { college: 'Florida College (FL)', coach: 'David Ashwood', email: 'ashwoodd@floridacollege.edu' },
    { college: 'Florida Memorial (FL)', coach: 'Alex Nichols', email: 'Alex.nichols@fmuniv.edu' },
    { college: 'Florida National (FL)', coach: 'Ruy Da Silva', email: 'rdasilva@fn.edu' },
    { college: 'Freed-Hardeman (TN)', coach: 'Jason Elliot', email: 'jelliot@fhu.edu' },
    { college: 'Friends (KS)', coach: 'Brya Perez', email: 'bryan_perez@friends.edu' },
    { college: 'Georgetown College', coach: 'Brian Wiese', email: 'gumenssoccer@georgetown.edu' },
    { college: 'Georgia Gwinnett College', coach: 'Steve DeCou', email: 'sdecou@ggc.edu' },
    { college: 'Goshen College', coach: 'Dan Sullivan', email: 'desullivan@gishen.edu' },
    { college: 'Governors State University', coach: 'Matt Eggert', email: 'meggert@govst.edu' },
    { college: 'Grace College', coach: 'Arron Patrick', email: 'patrica@grace.edu' },
    { college: 'Graceland University', coach: 'Bryan Courtney', email: 'bcourtne@graceland.edu' },
    { college: 'Grand View University', coach: 'David Groves', email: 'dgroves@grandview.edu' },
    { college: 'Hannibal-LaGrange University', coach: 'Lucas Almeida', email: 'lucas.almedia@hlg.edu' },
    { college: 'Harris-Stowe State University', coach: 'Nenad Todorovic', email: 'todorovicn@hssu.edu' },
    { college: 'Hastings College', coach: 'Cole Poppen', email: 'cole.poppen@hastings.edu' },
    { college: 'Holy Cross College', coach: 'Marco Koolman', email: 'msoccer@holycross.edu' },
    { college: 'Hope International University', coach: 'Joe Lurker', email: 'jdlurker@hiu.edu' },
    { college: 'Huntington University', coach: 'Russ Lawson', email: 'rlawson@huntington.edu' },
    { college: 'Huston-Tillotson University', coach: 'Joshua Reyes', email: 'joreyes@htu.edu' },
    { college: 'Indiana University East', coach: 'Dalton Clement', email: 'dclemen@iu.edu' },
    { college: 'Indiana Northwest', coach: 'Ben Kososkie', email: 'bkososk@iu.edu' },
    { college: 'Indiana Tech', coach: 'Paul Gilbert', email: 'pegilbert@indianatech.edu' },
    { college: 'Indiana University', coach: 'Todd Yeagley', email: 'N/A' },
    { college: 'Indiana Wesleyan (IN)', coach: 'Matt Reeb', email: 'matt.reeb@indwes.edu' },
    { college: 'Iowa Wesleyan University', coach: 'Geoff Wheeler', email: 'gwheeler@wesleyan.edu' },
    { college: 'Jarvis Christian University', coach: 'David Martinez', email: 'dmartinez@jarvis.edu' },
    { college: 'Jessup University', coach: 'Greg Lazaga', email: 'glazaga@jessup.edu' },
    { college: 'John Brown University', coach: 'Chris Cole', email: 'ccole@jbu.edu' },
    { college: 'Johnson University', coach: 'Isaac Morris', email: 'imorris@johnson.edu' },
    { college: 'Judson University', coach: 'Rafael Heck', email: 'rafael.heck@judson.edu' },
    { college: 'Kansas Wesleyan University', coach: 'Bruce Palmbaum', email: 'bruce.palmbaum@kwu.edu' },
    { college: 'Keiser University', coach: 'Gavin Oldham', email: 'goldham@keiseruniversity.edu' },
    { college: 'Kentucky Christian', coach: 'Jeremy Miller', email: 'jeremymiller@kcu.edu' },
    { college: 'La Sierra University', coach: 'David Trevino', email: 'dtre187@lasierra.edu' },
    { college: 'Lawrence Tech University', coach: 'Will Dyer', email: 'wdyer@ltu.edu' },
    { college: 'Life Pacific University', coach: 'Joey DeSantis', email: 'jdesantis@lifepacific.edu' },
    { college: 'Life University', coach: 'Alex Pama', email: 'Alex.Pama@LIFE.edu' },
    { college: 'Lindsey Wilson College', coach: 'Sicelo Buthelezi', email: 'buthelezi@lindsey.edu' },
    { college: 'Louisiana Christian University', coach: 'David Castillo', email: 'David.castillo@lcuniversity@edu' },
    { college: 'Lourdes University', coach: 'Matt Johnson', email: 'mjohnson2@lourdes.edu' },
    { college: 'LSU Alexandria', coach: 'Mackenzie Young', email: 'mackenziey@lsua.edu' },
    { college: 'LSU Shreveport', coach: 'Adam Kay', email: 'adam.kay@lsus.edu' },
    { college: 'Madonna University', coach: 'Mark Zathey', email: 'mzathey@madonna.edu' },
    { college: 'Marian University Indianapolis', coach: 'James Jenkins', email: 'jjenkins@marian.edu' },
    { college: 'McPherson College', coach: 'Kent Freund', email: 'freundk@mcpherson.edu' },
    { college: 'Menlo College', coach: 'Keith Lambert', email: 'keith.lambert@menlo.edu' },
    { college: 'Mid-America Christian University', coach: 'Neil Hilton', email: 'neil.hilton@macu.edu' },
    { college: 'Mid-America Nazarene University', coach: 'Kevin Wardlaw', email: 'kpwardlaw@mnu.edu' },
    { college: 'Middle Georgia State University', coach: 'Scott Henderson', email: 'scott.henderson1@mga.edu' },
    { college: 'Midland University', coach: 'Josh Nakayama', email: 'nakayama@midland.edu' },
    { college: 'Midway University', coach: 'Tim Wolz', email: 'twolz@midway.edu' },
    { college: 'Milligan University', coach: 'Paddy Sweeney', email: 'N/A' },
    { college: 'Missouri Baptist University', coach: 'Jake Alvernia', email: 'Jacob.Alvernia@mobap.edu' },
    { college: 'Missouri Valley College', coach: 'Vladimir Simic', email: 'simicv@moval.edu' },
    { college: 'Montreat College', coach: 'Michael Bruce', email: 'brucemj@montreat.edu' },
    { college: 'Morningside University', coach: 'Thomas Maxon', email: '' },
    { college: 'Mount Marty University', coach: 'Oliver Tieleman', email: 'oliver.tieleman@mountmarty.edu' },
    { college: 'Mount Mercy University', coach: 'Amir Hadzic', email: 'ahadzic@mtmercy.edu' },
    { college: 'Mount Vernon Nazarene University', coach: 'Zach Ganzberg', email: 'zach.ganzberg@mvnu.edu' },
    { college: 'Multnomah University', coach: 'Dalon Parker', email: 'dparker@multnomah.edu' },
    { college: 'North American University', coach: 'Dane Smith', email: 'dsmith@na.edu' },
    { college: 'Northwest University', coach: 'Gary McIntosh', email: 'gary.mcintosh@northwst.edu' },
    { college: 'Northwestern College', coach: 'Dan Swier', email: 'dswier@nwciowa.edu' },
    { college: 'Oakland City University', coach: 'Adam Sell', email: 'asell@oak.edu' },
    { college: 'Oakwood University', coach: 'Frank Davies', email: 'frank_davies@yahoo.com' },
    { college: 'Ohio Christian University', coach: 'George Arroyo Jr', email: 'garroyojr@ohiochristian.edu' },
    { college: 'Oklahoma City University', coach: 'Billy Martin', email: 'wjmartin@okcu.edu' },
    { college: 'Oklahoma Panhandle State University', coach: 'Garrett Kull', email: 'garrett.kull@opsu.edu' },
    { college: 'Oklahoma Wesleyan University', coach: 'Jamie Peterson', email: 'jpeterson@okwu.edu' },
    { college: 'Olivet Nazarene University', coach: 'Mark Tun', email: 'mtun@olivet.edu' },
    { college: 'Oregon Institute of Technology', coach: 'Sean McManamon', email: 'sean.mcmanamon@oit.edu' },
    { college: 'Ottawa University', coach: 'James Cottage', email: 'james.cottage@ottawa.edu' },
    { college: 'Ottawa University – Surprise', coach: 'David Stockton', email: 'david.stockton@ottawa.edu' },
    { college: 'Our Lady of the Lake University', coach: 'Shane Hurley', email: 'dshurley@ollusa.edu' },
    { college: 'Pacific Union College', coach: 'Shane Shelton', email: 'Sshelton@puc.edu' },
    { college: 'Park University', coach: 'Efrem Shimlis', email: 'eshimlis@park.edu' },
    { college: 'Paul Quinn College', coach: 'Michael Delgado', email: 'mdelgado@pqc.edu' },
    { college: 'Point Park University', coach: 'Cameron Williams', email: 'cwiliams2@pointpark.edu' },
    { college: 'Providence Christian College', coach: 'Robert Gurule', email: 'rob.gurule@providence.edu' },
    { college: 'Rochester University', coach: 'Daniel Seargant', email: 'dseargant@rochesteru.edu' },
    { college: 'Rocky Mountain College', coach: 'Richard Duffy', email: 'duffyr@rocky.edu' },
    { college: 'Roosevelt University', coach: 'Paddy Heopp', email: 'pjoepp@roosevelt.edu' },
    { college: 'Saint Mary-of-the-Woods College', coach: 'Bradley Cole', email: 'bradley.cole@smwc.edu' },
    { college: 'Saint Xavier University', coach: 'Ed Vucinic', email: 'vucinic@sxu.edu' },
    { college: 'Savannah College of Art and Design', coach: 'John Haworth', email: 'menssoccer@scad.edu' },
    { college: 'Shawnee State University', coach: 'Natasha Ademakinwa', email: 'nademakinwa@shawnee.edu' },
    { college: 'Siena Heights University', coach: 'Drew Crawford', email: 'acrawfor@sienaheights.edu' },
    { college: 'Simpson University', coach: 'Gary Weaver', email: 'Gweaver@simpson.edu' },
    { college: 'Soka University of America', coach: 'Shawn Beyer', email: 'sbeyer@soka.edu' },
    { college: 'Southeastern University', coach: 'Clay Roberts', email: 'croberts@seu.edu' },
    { college: 'Southern Oregon University', coach: 'Davie Carmichael', email: 'carmichad@sou.edu' },
    { college: 'Southwestern Assemblies of God University', coach: 'Clementin Oancea', email: 'coancea@sagu.edu' },
    { college: 'Southwestern Christian University', coach: 'Jimmy Fermin Jr', email: 'Jimmy.Fermin@swcu.edu' },
    { college: 'Southwestern College – Kansas', coach: 'Lee Howarth', email: 'lee.howarth@sckans.edu' },
    { college: 'Spring Arbor University', coach: 'Marco Bernardini', email: 'Marco.bernardini@arbor.edu' },
    { college: 'St. Ambrose University', coach: 'Chad Hollmer', email: 'HollmerChad@sau.edu' },
    { college: 'St. Andrews University - North Carolina', coach: 'Stevan Hernadez', email: 'N/A' },
    { college: 'St. Thomas University – Florida', coach: 'Feliks Mats', email: 'fmats@stu.edu' },
    { college: 'Sterling College – Kansas', coach: 'Jeff Kidd', email: 'jkidd@sterling.edu' },
    { college: 'Tabor College', coach: 'Grant Brubacher', email: 'grantb@tabor.edu' },
    { college: 'Talladega College', coach: 'Junior Noel', email: 'jnoel@talladega.edu' },
    { college: 'Taylor University', coach: 'Gary Ross', email: 'grross@taylor.edu' },
    { college: 'Tennessee Southern', coach: 'Bret Boylan', email: 'bboylan@utsouthern.edu' },
    { college: 'Tennessee Wesleyan', coach: 'Luke Winter', email: 'lwinter@tnwesleyan.edu' },
    { college: 'Texas A&M University-San Antonio', coach: 'Robert Jaramillo', email: 'roberto.jaramillo@tamusa.edu' },
    { college: 'Texas A&M University-Texarkana', coach: 'Don Koontz', email: 'dkoontz@tamut.edu' },
    { college: 'Texas College', coach: 'Marco Mthembu', email: 'mmthembu@texas.college.edu' },
    { college: 'Texas Wesleyan University', coach: 'Cole Sweetser', email: 'csweetser@txwes.edu' },
    { college: 'The Master\'s University', coach: 'Jim Rickard', email: 'jrickard@masters.edu' },
    { college: 'Thomas University', coach: 'Billy Jeffery', email: 'wjffery@thomasu.edu' },
    { college: 'Tougaloo College', coach: 'Ahmad Smith', email: 'ahsmith@tougaloo.edu' },
    { college: 'Trinity Christian College', coach: 'Gabriel Sitibaldi', email: 'gabriel.sitibaldi@trnty.edu' },
    { college: 'Truett McConnell University', coach: 'Scott Borchers', email: 'sborchers@truett.edu' },
    { college: 'Union University', coach: 'Steven Cox', email: 'scox@uu.edu' },
    { college: 'University of Antelope Valley', coach: 'Jarold Cline', email: 'jarrod.cline@uav.edu' },
    { college: 'University of California', coach: 'Leonard Griffin', email: 'calsoccer@berkeley.edu' },
    { college: 'University of Health Sciences & Pharmacy', coach: 'Daniel Hogan', email: 'daniel.hogan@uhsp.edu' },
    { college: 'University of Houston – Victoria', coach: 'Adrian Rigby', email: 'RigbyA@uhv.edu' },
    { college: 'University of Jamestown', coach: 'Connor Campbell', email: 'Connor.Campbell@uj.edu' },
    { college: 'University of Michigan – Dearborn', coach: 'Worteh Sampson', email: 'sampsonw@umich.edu' },
    { college: 'University of Mobile', coach: 'Daniel Whelan', email: 'dwhelan@umobile.edu' },
    { college: 'University of Northwestern Ohio', coach: 'Tyler Brock', email: 'tbrock@unoh.edu' },
    { college: 'University of Pikeville', coach: 'Shaun Schetka', email: 'shaunshetka@upike.edu' },
    { college: 'University of Providence', coach: 'Will Hander', email: 'will.hander@uprovidence.edu' },
    { college: 'University of Rio Grande', coach: 'Bryheem Hancock', email: 'bryheem.hancock@utrgv.edu' },
    { college: 'University of Saint Francis – Indiana', coach: 'Mamba Chisoni', email: 'MChisoni@sf.edu' },
    { college: 'University of Saint Katherine', coach: 'Brad Green', email: 'bgreen@usk.edu' },
    { college: 'University of Saint Mary', coach: 'Johnny Clifford', email: 'jclifford@stmarytx.edu' },
    { college: 'University of Science & Arts of Oklahoma', coach: 'Jimmy Hampton', email: 'jhampton@usao.edu' },
    { college: 'University of St. Francis – Illinois', coach: 'Vince Martinez', email: 'vmartinez@stfrancis.edu' },
    { college: 'University of the Cumberlands', coach: 'Chris LeFevre', email: 'christopher.lefevre@ucumberlands.edu' },
    { college: 'University of the Southwest', coach: 'Edgar Negrete', email: 'enegrete@usw.edu' },
    { college: 'Vanguard University', coach: 'Jesus (Chuy) Miramontes', email: 'jmiramontes@vanguard.edu' },
    { college: 'Viterbo University', coach: 'Roberto Yepez', email: 'rayepez@viterbo.edu' },
    { college: 'Waldorf University', coach: 'Thomas Goodman', email: 'thomas.goodman@waldorf.edu' },
    { college: 'Walla Walla University', coach: 'Adam Gervis', email: 'adam.gervis@wallawalla.edu' },
    { college: 'Warner Pacific University', coach: 'Troy Ready', email: 'tready@warnerpacific.edu' },
    { college: 'Warner University', coach: 'Drew Stacey', email: 'drew.stacey@warner.edu' },
    { college: 'Washington Adventist University', coach: 'Daniel Carroll', email: 'dcarroll@wau.edu' },
    { college: 'Wayland Baptist University', coach: 'Roberto Ssejjemba', email: 'ssejjembar@wbu.edu' },
    { college: 'Webber International University', coach: 'Phillip Bohn', email: 'BohnPR@webber.edu' },
    { college: 'West Virginia University', coach: 'Dan Stratford', email: 'N/A' },
    { college: 'Westcliff University', coach: 'Rich Tovrik', email: 'richardtovrik@westcliff.edu' },
    { college: 'Wiley University', coach: 'Rafael Gonzalez', email: 'rgonzalez@wileyc.edu' },
    { college: 'William Carey University', coach: 'Barry Farrel', email: 'bfarrell@wmcarey.edu' },
    { college: 'William Penn University', coach: 'Simon Brown', email: 'brownsi@wmpenn.edu' },
    { college: 'William Woods University', coach: 'Tommy Nienhaus', email: 'Tommy.Nienhaus@williamwoods.edu' },
    { college: 'Williams Baptist University', coach: 'Carl Kennedy', email: 'ckennedy@williamsbu.edu' },
    { college: 'Xavier University', coach: 'John Higgins', email: 'Higginsj5@xavier.edu' },
    { college: 'York University', coach: 'Carmine Isacco', email: 'cisacco@yorku.ca' }
];

module.exports = {coaches};