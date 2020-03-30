const mongoose = require('mongoose');
const {User} = require("../models/user");
const {Group} = require("../models/group");
const log = console.log;

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/PhonogenesisDB';
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
const db = mongoose.connection;

db.once('open', function () {
	log("DB connection successful!");

	const defaultAdmin = new User({
		type: "admin",
		name: "admin_name",
		email: "admin@pg.com",
		username: "admin",
		password: "admin",
		groups: [],
		quizzes: []
	});
	defaultAdmin.save().then(function (result) {
		log("added default admin");
	}, function (error) {
		log("default admin exists");
	});

	const defaultStudent = new User({
		type: "student",
		name: "stu_name",
		email: "stu@pg.com",
		username: "stu",
		password: "stu",
		groups: ["CSC309"],
		quizzes: [{
			timeLim: 120,
			name: "test-quiz",
			questions: [
				{
					size: 20,
					canUR: true,
					canPhoneme: true,
					maxCADT: 3,
					rule: {
						templates: ['[consonant]-[vowel]', '[consonant]-[vowel]-[consonant]', '[consonant]-[vowel]-[consonant]-[vowel]', '[consonant]-[vowel]-[obstruent,voiceless]-[obstruent,voiceless]-[vowel]', '[consonant]-[vowel]-[obstruent,voiced]-[consonant,voiced]-[vowel]', '[consonant]-[vowel]-[sonorant,contoid]-[consonant]-[vowel]', '[consonant]-[vowel]-[consonant]-[vowel]-[consonant]', '[consonant]-[vowel]-[obstruent,voiceless]-[obstruent,voiceless]-[vowel]-[consonant]', '[consonant]-[vowel]-[obstruent,voiced]-[consonant,voiced]-[vowel]-[consonant]', '[consonant]-[vowel]-[sonorant,contoid]-[consonant]-[vowel]-[consonant]'],
						poi: "['c', 'ɟ', 'ç', 'ʝ', 'ɲ', 'k', 'g', 'x', 'ɣ', 'ŋ']",
						ruleType: "Alternating",
						phoneme: "p b t d k g ʔ t͡ʃ d͡ʒ f v θ ð s z ʃ ʒ x ɣ m n ŋ l w j i e ɔ o æ ɑ",
						ruleTxt: "palatalization of velars after high front vowels",
						gloss: ['\'bounce\'', '\'wheat\'', '\'mosquito\'', '\'awaken\'', '\'two\'', '\'coastline\'', '\'rain\'', '\'lose\'', '\'we (incl)\'', '\'bring\'', '\'you (dual)\'', '\'what\'', '\'ketchup\'', '\'sun\'', '\'build\'', '\'lake\'', '\'west\'', '\'fight\'', '\'destroy\'', '\'thumb\'', '\'kneel\'', '\'few\'', '\'then\'', '\'black\'', '\'pretend\'', '\'food\'', '\'apple\'', '\'onion\'', '\'horn\'', '\'soybean\''],
						SR: ['diɲxɑ', 'ʃiɟe', 'ɣiçseɣ', 'ŋoʒziç', 'kicɑθ', 'ŋictog', 'xiɲʔo', 'lɔmiɟ', 'kiɲd͡ʒɑt͡ʃ', 'ʔicʃɑ', 'giʝneɣ', 'kɔfxiʝ', 'ʃiçɔ', 'liɲvoŋ', 'θiɲ', 'koxoʒ', 'ʒiʒŋi', 'zid͡ʒŋe', 'ɣɔɣjɔz', 'gæŋjɔ', 'ɣot͡ʃxæ', 'xoɣɣɔ', 'ɣækʔil', 'ʒogʒi', 'ðex', 'ŋɔp', 'ŋe', 'jældeʒ', 'ʔɑnmæ', 'pesin'],
						UR: ['diŋxɑ', 'ʃige', 'ɣixseɣ', 'ŋoʒzix', 'kikɑθ', 'ŋiktog', 'xiŋʔo', 'lɔmig', 'kiŋd͡ʒɑt͡ʃ', 'ʔikʃɑ', 'giɣneɣ', 'kɔfxiɣ', 'ʃixɔ', 'liŋvoŋ', 'θiŋ', 'koxoʒ', 'ʒiʒŋi', 'zid͡ʒŋe', 'ɣɔɣjɔz', 'gæŋjɔ', 'ɣot͡ʃxæ', 'xoɣɣɔ', 'ɣækʔil', 'ʒogʒi', 'ðex', 'ŋɔp', 'ŋe', 'jældeʒ', 'ʔɑnmæ', 'pesin']
					}
				},
				{
					size: 20,
					canUR: false,
					canPhoneme: false,
					maxCADT: 0,
					rule: {
						templates: ['[consonant]-[vowel]', '[consonant]-[vowel]-[consonant]', '[consonant]-[vowel]-[consonant]-[vowel]', '[consonant]-[vowel]-[obstruent,voiceless]-[obstruent,voiceless]-[vowel]', '[consonant]-[vowel]-[obstruent,voiced]-[consonant,voiced]-[vowel]', '[consonant]-[vowel]-[sonorant,contoid]-[consonant]-[vowel]', '[consonant]-[vowel]-[consonant]-[vowel]-[consonant]', '[consonant]-[vowel]-[obstruent,voiceless]-[obstruent,voiceless]-[vowel]-[consonant]', '[consonant]-[vowel]-[obstruent,voiced]-[consonant,voiced]-[vowel]-[consonant]', '[consonant]-[vowel]-[sonorant,contoid]-[consonant]-[vowel]-[consonant]'],
						poi: "p b f v m m̥ t d θ ð s z ʃ ʒ n n̥ t͡ʃ d͡ʒ k g x ɣ ŋ ŋ̥ r l r̥ l̥ j w j̥ ʍ",
						ruleType: "Mixed",
						phoneme: "p b t d k g ʔ t͡ʃ d͡ʒ f v θ ð s z ʃ ʒ h x ɣ m n ŋ r l w j i e u a",
						ruleTxt: "word-final stop devoicing",
						gloss: ['brown', 'four', 'torso', 'blackberry', 'sister', 'stream', 'ear', 'hear', 'coastline', 'flame', 'food', 'tree', 'grow', 'west', 'buy', 'these', 'tomato', 'apple', 'tiger', 'wrist', 'camel', 'learn', 'dry', 'child', 'mouth', 'good', 'man', 'sparrow', 'husband', 'name', 'depend on', 'black', 'fruit bat', 'sleep', 'run', 'turtle', 'heavy', 'sit', 'eye', 'ignore'],
						SR: ['zuhʔuk', 'ɡut͡ʃθaʃ', 'dat͡ʃxuŋ̥', 'd͡ʒiθ', 'niʒvaj̥', 'bunkut', 'ɣudeθ', 'ðet͡ʃ', 'd͡ʒizvep', 'zuʃhek', 'meʒðum̥', 'ŋarhun̥', 'jiɡel̥', 'xabeθ', 'jappuf', 'nehax', 'talɡaθ', 'ʔiddaŋ̥', 'ðut͡ʃ', 'juxʔeʃ', 'θud͡ʒu', 'wuzwi', 'saŋt͡ʃaf', 'ʃabŋaθ', 'dalɡe', 'laldi', 'ɣiθti', 'naɣu', 'ðassi', 'jaðʒu', 'ðammiʃ', 'ðeŋzi', 'ŋapʔi', 'ɣeʃθa', 'relda', 'ɣup', 'ʔet͡ʃap', 'ki', 'tipi', 'tifeh'],
						UR: ['zuhʔuɡ', 'ɡut͡ʃθaʒ', 'dat͡ʃxuŋ', 'd͡ʒið', 'niʒvaj', 'bunkud', 'ɣudeð', 'ðed͡ʒ', 'd͡ʒizveb', 'zuʃheɡ', 'meʒðum', 'ŋarhun', 'jiɡel', 'xabeð', 'jappuv', 'nehaɣ', 'talɡað', 'ʔiddaŋ', 'ðud͡ʒ', 'juxʔeʒ', 'θud͡ʒu', 'wuzwi', 'saŋt͡ʃaf', 'ʃabŋaθ', 'dalɡe', 'laldi', 'ɣiθti', 'naɣu', 'ðassi', 'jaðʒu', 'ðammiʃ', 'ðeŋzi', 'ŋapʔi', 'ɣeʃθa', 'relda', 'ɣup', 'ʔet͡ʃap', 'ki', 'tipi', 'tifeh']
					}
				},
				{
					size: 20,
					canUR: true,
					canPhoneme: false,
					maxCADT: 1,
					rule: {
						templates: ['[consonant]-[vowel]', '[consonant]-[vowel]-[consonant]', '[consonant]-[vowel]-[consonant]-[vowel]', '[consonant]-[vowel]-[obstruent,voiceless]-[obstruent,voiceless]-[vowel]', '[consonant]-[vowel]-[obstruent,voiced]-[consonant,voiced]-[vowel]', '[consonant]-[vowel]-[sonorant,contoid]-[consonant]-[vowel]', '[consonant]-[vowel]-[consonant]-[vowel]-[consonant]', '[consonant]-[vowel]-[obstruent,voiceless]-[obstruent,voiceless]-[vowel]-[consonant]', '[consonant]-[vowel]-[obstruent,voiced]-[consonant,voiced]-[vowel]-[consonant]', '[consonant]-[vowel]-[sonorant,contoid]-[consonant]-[vowel]-[consonant]'],
						poi: "c ɟ ç ʝ ɲ k g x ɣ ŋ",
						ruleType: "Alternating",
						phoneme: "p b t d k g f v θ ð s z ʃ ʒ x ɣ m n ŋ r l w i e ɛ ɔ o ə a",
						ruleTxt: "palatalization of velars after front vowels",
						UR: ['ʃaŋix', 'kiŋɔ', 'ɣeɣɡox', 'ɡɛŋni', 'ŋeŋək', 'ɡɛɡvɔ', 'xexiʃ', 'ɡiɣðɔɡ', 'kixfe', 'wiɣzix', 'xomɡek', 'miɣrin', 'ɡɛŋɣo', 'təɣɛŋ', 'zekxi', 'kəɣɛk', 'xiŋʃop', 'ŋiɣɣa', 'kɛɡɡo', 'ŋeʒbeɣ', 'ŋəffak', 'kɔɣbə', 'sarɡe', 'soðɣol', 'ɡanɡə', 'kittam', 'ŋedbi', 'ɣa', 'tɔŋɔr', 'toɣraŋ', 'wəmkis', 'ɣaxxe', 'xɛʒðɔθ', 'ɣaŋ', 'ɣɛvda', 'ŋɛ', 'ʒizləw', 're', 'ðɔʃθɛl', 'fivla'],
						SR: ['ʃaŋiç', 'kiɲɔ', 'ɣeʝɡox', 'ɡɛɲni', 'ŋeɲək', 'ɡɛɟvɔ', 'xeçiʃ', 'ɡiʝðɔɡ', 'kiçfe', 'wiʝziç', 'xomɡec', 'miʝrin', 'ɡɛɲɣo', 'təɣɛɲ', 'zecxi', 'kəɣɛc', 'xiɲʃop', 'ŋiʝɣa', 'kɛɟɡo', 'ŋeʒbeʝ', 'ŋəffak', 'kɔɣbə', 'sarɡe', 'soðɣol', 'ɡanɡə', 'kittam', 'ŋedbi', 'ɣa', 'tɔŋɔr', 'toɣraŋ', 'wəmkis', 'ɣaxxe', 'xɛʒðɔθ', 'ɣaŋ', 'ɣɛvda', 'ŋɛ', 'ʒizləw', 're', 'ðɔʃθɛl', 'fivla'],
						gloss: ['eyelash', 'desire', 'fog', 'murky', 'earth', 'path', 'finger', 'duck', 'find', 'we (incl)', 'broken', 'look', 'taste', 'nostril', 'insect', 'empty', 'every', 'who', 'crawl', 'pond', 'change', 'sell', 'night', 'grapefruit', 'blueberry', 'flat', 'lion', 'turtle', 'mouth', 'chin', 'bone', 'call', 'dinner', 'wet', 'fire', 'cod', 'hair', 'group', 'celery', 'tree']
					}
				}
			]
		}]
	});
	defaultStudent.save().then(function (result) {
		log("added default student");
	}, function (error) {
		log("default student exists");
	});

	const defaultProf = new User({
		type: "professor",
		name: "prof_name",
		email: "prof@pg.com",
		username: "prof",
		password: "prof",
		groups: ["CSC309"],
		quizzes: [{
			timeLim: 120,
			name: "test-quiz",
			questions: [
				{
					size: 20,
					canUR: true,
					canPhoneme: true,
					maxCADT: 3,
					rule: {
						templates: ['[consonant]-[vowel]', '[consonant]-[vowel]-[consonant]', '[consonant]-[vowel]-[consonant]-[vowel]', '[consonant]-[vowel]-[obstruent,voiceless]-[obstruent,voiceless]-[vowel]', '[consonant]-[vowel]-[obstruent,voiced]-[consonant,voiced]-[vowel]', '[consonant]-[vowel]-[sonorant,contoid]-[consonant]-[vowel]', '[consonant]-[vowel]-[consonant]-[vowel]-[consonant]', '[consonant]-[vowel]-[obstruent,voiceless]-[obstruent,voiceless]-[vowel]-[consonant]', '[consonant]-[vowel]-[obstruent,voiced]-[consonant,voiced]-[vowel]-[consonant]', '[consonant]-[vowel]-[sonorant,contoid]-[consonant]-[vowel]-[consonant]'],
						poi: "['c', 'ɟ', 'ç', 'ʝ', 'ɲ', 'k', 'g', 'x', 'ɣ', 'ŋ']",
						ruleType: "Alternating",
						phoneme: "p b t d k g ʔ t͡ʃ d͡ʒ f v θ ð s z ʃ ʒ x ɣ m n ŋ l w j i e ɔ o æ ɑ",
						ruleTxt: "palatalization of velars after high front vowels",
						gloss: ['\'bounce\'', '\'wheat\'', '\'mosquito\'', '\'awaken\'', '\'two\'', '\'coastline\'', '\'rain\'', '\'lose\'', '\'we (incl)\'', '\'bring\'', '\'you (dual)\'', '\'what\'', '\'ketchup\'', '\'sun\'', '\'build\'', '\'lake\'', '\'west\'', '\'fight\'', '\'destroy\'', '\'thumb\'', '\'kneel\'', '\'few\'', '\'then\'', '\'black\'', '\'pretend\'', '\'food\'', '\'apple\'', '\'onion\'', '\'horn\'', '\'soybean\''],
						SR: ['diɲxɑ', 'ʃiɟe', 'ɣiçseɣ', 'ŋoʒziç', 'kicɑθ', 'ŋictog', 'xiɲʔo', 'lɔmiɟ', 'kiɲd͡ʒɑt͡ʃ', 'ʔicʃɑ', 'giʝneɣ', 'kɔfxiʝ', 'ʃiçɔ', 'liɲvoŋ', 'θiɲ', 'koxoʒ', 'ʒiʒŋi', 'zid͡ʒŋe', 'ɣɔɣjɔz', 'gæŋjɔ', 'ɣot͡ʃxæ', 'xoɣɣɔ', 'ɣækʔil', 'ʒogʒi', 'ðex', 'ŋɔp', 'ŋe', 'jældeʒ', 'ʔɑnmæ', 'pesin'],
						UR: ['diŋxɑ', 'ʃige', 'ɣixseɣ', 'ŋoʒzix', 'kikɑθ', 'ŋiktog', 'xiŋʔo', 'lɔmig', 'kiŋd͡ʒɑt͡ʃ', 'ʔikʃɑ', 'giɣneɣ', 'kɔfxiɣ', 'ʃixɔ', 'liŋvoŋ', 'θiŋ', 'koxoʒ', 'ʒiʒŋi', 'zid͡ʒŋe', 'ɣɔɣjɔz', 'gæŋjɔ', 'ɣot͡ʃxæ', 'xoɣɣɔ', 'ɣækʔil', 'ʒogʒi', 'ðex', 'ŋɔp', 'ŋe', 'jældeʒ', 'ʔɑnmæ', 'pesin']
					}
				},
				{
					size: 20,
					canUR: false,
					canPhoneme: false,
					maxCADT: 0,
					rule: {
						templates: ['[consonant]-[vowel]', '[consonant]-[vowel]-[consonant]', '[consonant]-[vowel]-[consonant]-[vowel]', '[consonant]-[vowel]-[obstruent,voiceless]-[obstruent,voiceless]-[vowel]', '[consonant]-[vowel]-[obstruent,voiced]-[consonant,voiced]-[vowel]', '[consonant]-[vowel]-[sonorant,contoid]-[consonant]-[vowel]', '[consonant]-[vowel]-[consonant]-[vowel]-[consonant]', '[consonant]-[vowel]-[obstruent,voiceless]-[obstruent,voiceless]-[vowel]-[consonant]', '[consonant]-[vowel]-[obstruent,voiced]-[consonant,voiced]-[vowel]-[consonant]', '[consonant]-[vowel]-[sonorant,contoid]-[consonant]-[vowel]-[consonant]'],
						poi: "p b f v m m̥ t d θ ð s z ʃ ʒ n n̥ t͡ʃ d͡ʒ k g x ɣ ŋ ŋ̥ r l r̥ l̥ j w j̥ ʍ",
						ruleType: "Mixed",
						phoneme: "p b t d k g ʔ t͡ʃ d͡ʒ f v θ ð s z ʃ ʒ h x ɣ m n ŋ r l w j i e u a",
						ruleTxt: "word-final stop devoicing",
						gloss: ['brown', 'four', 'torso', 'blackberry', 'sister', 'stream', 'ear', 'hear', 'coastline', 'flame', 'food', 'tree', 'grow', 'west', 'buy', 'these', 'tomato', 'apple', 'tiger', 'wrist', 'camel', 'learn', 'dry', 'child', 'mouth', 'good', 'man', 'sparrow', 'husband', 'name', 'depend on', 'black', 'fruit bat', 'sleep', 'run', 'turtle', 'heavy', 'sit', 'eye', 'ignore'],
						SR: ['zuhʔuk', 'ɡut͡ʃθaʃ', 'dat͡ʃxuŋ̥', 'd͡ʒiθ', 'niʒvaj̥', 'bunkut', 'ɣudeθ', 'ðet͡ʃ', 'd͡ʒizvep', 'zuʃhek', 'meʒðum̥', 'ŋarhun̥', 'jiɡel̥', 'xabeθ', 'jappuf', 'nehax', 'talɡaθ', 'ʔiddaŋ̥', 'ðut͡ʃ', 'juxʔeʃ', 'θud͡ʒu', 'wuzwi', 'saŋt͡ʃaf', 'ʃabŋaθ', 'dalɡe', 'laldi', 'ɣiθti', 'naɣu', 'ðassi', 'jaðʒu', 'ðammiʃ', 'ðeŋzi', 'ŋapʔi', 'ɣeʃθa', 'relda', 'ɣup', 'ʔet͡ʃap', 'ki', 'tipi', 'tifeh'],
						UR: ['zuhʔuɡ', 'ɡut͡ʃθaʒ', 'dat͡ʃxuŋ', 'd͡ʒið', 'niʒvaj', 'bunkud', 'ɣudeð', 'ðed͡ʒ', 'd͡ʒizveb', 'zuʃheɡ', 'meʒðum', 'ŋarhun', 'jiɡel', 'xabeð', 'jappuv', 'nehaɣ', 'talɡað', 'ʔiddaŋ', 'ðud͡ʒ', 'juxʔeʒ', 'θud͡ʒu', 'wuzwi', 'saŋt͡ʃaf', 'ʃabŋaθ', 'dalɡe', 'laldi', 'ɣiθti', 'naɣu', 'ðassi', 'jaðʒu', 'ðammiʃ', 'ðeŋzi', 'ŋapʔi', 'ɣeʃθa', 'relda', 'ɣup', 'ʔet͡ʃap', 'ki', 'tipi', 'tifeh']
					}
				},
				{
					size: 20,
					canUR: true,
					canPhoneme: false,
					maxCADT: 1,
					rule: {
						templates: ['[consonant]-[vowel]', '[consonant]-[vowel]-[consonant]', '[consonant]-[vowel]-[consonant]-[vowel]', '[consonant]-[vowel]-[obstruent,voiceless]-[obstruent,voiceless]-[vowel]', '[consonant]-[vowel]-[obstruent,voiced]-[consonant,voiced]-[vowel]', '[consonant]-[vowel]-[sonorant,contoid]-[consonant]-[vowel]', '[consonant]-[vowel]-[consonant]-[vowel]-[consonant]', '[consonant]-[vowel]-[obstruent,voiceless]-[obstruent,voiceless]-[vowel]-[consonant]', '[consonant]-[vowel]-[obstruent,voiced]-[consonant,voiced]-[vowel]-[consonant]', '[consonant]-[vowel]-[sonorant,contoid]-[consonant]-[vowel]-[consonant]'],
						poi: "c ɟ ç ʝ ɲ k g x ɣ ŋ",
						ruleType: "Alternating",
						phoneme: "p b t d k g f v θ ð s z ʃ ʒ x ɣ m n ŋ r l w i e ɛ ɔ o ə a",
						ruleTxt: "palatalization of velars after front vowels",
						UR: ['ʃaŋix', 'kiŋɔ', 'ɣeɣɡox', 'ɡɛŋni', 'ŋeŋək', 'ɡɛɡvɔ', 'xexiʃ', 'ɡiɣðɔɡ', 'kixfe', 'wiɣzix', 'xomɡek', 'miɣrin', 'ɡɛŋɣo', 'təɣɛŋ', 'zekxi', 'kəɣɛk', 'xiŋʃop', 'ŋiɣɣa', 'kɛɡɡo', 'ŋeʒbeɣ', 'ŋəffak', 'kɔɣbə', 'sarɡe', 'soðɣol', 'ɡanɡə', 'kittam', 'ŋedbi', 'ɣa', 'tɔŋɔr', 'toɣraŋ', 'wəmkis', 'ɣaxxe', 'xɛʒðɔθ', 'ɣaŋ', 'ɣɛvda', 'ŋɛ', 'ʒizləw', 're', 'ðɔʃθɛl', 'fivla'],
						SR: ['ʃaŋiç', 'kiɲɔ', 'ɣeʝɡox', 'ɡɛɲni', 'ŋeɲək', 'ɡɛɟvɔ', 'xeçiʃ', 'ɡiʝðɔɡ', 'kiçfe', 'wiʝziç', 'xomɡec', 'miʝrin', 'ɡɛɲɣo', 'təɣɛɲ', 'zecxi', 'kəɣɛc', 'xiɲʃop', 'ŋiʝɣa', 'kɛɟɡo', 'ŋeʒbeʝ', 'ŋəffak', 'kɔɣbə', 'sarɡe', 'soðɣol', 'ɡanɡə', 'kittam', 'ŋedbi', 'ɣa', 'tɔŋɔr', 'toɣraŋ', 'wəmkis', 'ɣaxxe', 'xɛʒðɔθ', 'ɣaŋ', 'ɣɛvda', 'ŋɛ', 'ʒizləw', 're', 'ðɔʃθɛl', 'fivla'],
						gloss: ['eyelash', 'desire', 'fog', 'murky', 'earth', 'path', 'finger', 'duck', 'find', 'we (incl)', 'broken', 'look', 'taste', 'nostril', 'insect', 'empty', 'every', 'who', 'crawl', 'pond', 'change', 'sell', 'night', 'grapefruit', 'blueberry', 'flat', 'lion', 'turtle', 'mouth', 'chin', 'bone', 'call', 'dinner', 'wet', 'fire', 'cod', 'hair', 'group', 'celery', 'tree']
					}
				}
			]
		}]
	});
	defaultProf.save().then(function (result) {
		log("added default prof");
	}, function (error) {
		log("default prof exists");
	});

	const defaultGroup = new Group({
		name: "CSC309",
		students: ["stu"],
		owner: "prof"
	});
	defaultGroup.save().then(function (result) {
		log("added default group");
	}, function (err) {
		log("default group exists");
	});

});

module.exports = {mongoose};
