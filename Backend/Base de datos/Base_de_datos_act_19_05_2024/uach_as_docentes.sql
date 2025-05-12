CREATE DATABASE  IF NOT EXISTS `uach_as` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `uach_as`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: uach_as
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `docentes`
--

DROP TABLE IF EXISTS `docentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `docentes` (
  `Id_docente` int NOT NULL,
  `nombre_doc` varchar(100) NOT NULL,
  `Apellido` varchar(100) NOT NULL,
  `id_mat_as` int NOT NULL,
  `id_carrera_mat` int DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `apei2` varchar(100) DEFAULT NULL,
  `perfil` blob,
  `rol_doc` varchar(50) DEFAULT NULL,
  `contra_docente` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id_docente`),
  KEY `Mat_as_idx` (`id_mat_as`),
  KEY `NMat_as_idx` (`id_carrera_mat`),
  CONSTRAINT `num_carrera` FOREIGN KEY (`id_carrera_mat`) REFERENCES `carrera` (`Id_Carreras`) ON UPDATE CASCADE,
  CONSTRAINT `num_materia` FOREIGN KEY (`id_mat_as`) REFERENCES `materias` (`Id_Materias`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docentes`
--

LOCK TABLES `docentes` WRITE;
/*!40000 ALTER TABLE `docentes` DISABLE KEYS */;
INSERT INTO `docentes` VALUES (0,'Opciones','',0,0,'opciones@uach.mx','',_binary 'ÿ\Øÿ\à\0JFIF\0\0\0\0\0\0ÿ\Û\0„\0	( \Z%!1!%)+...383-7(-.+\n\n\n\r\Z\Z+-----------------+-------------------------------+ÿÀ\0\0¨,\"\0ÿ\Ä\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0ÿ\Ä\0<\0\0\0\0\0!1AQaq\"‘¡ğ±Á\Ñ2BR\áñ’#3br‚¢C²ÿ\Ä\0\0\0\0\0\0\0\0\0\0\0\0\0\0ÿ\Ä\0$\0\0\0\0\0\0\0\0\0!1AQ2\"#BRÿ\Ú\0\0\0?\0\Ï6¢N¨£Ê¸B\ÇR\è\ë\İ)¡‰Á‰\Íj(œÔ§r•\ÍMk  r\Å+)©›NT‚š±>šA¨º´\Ğ\íI12zAtÔºsX IE!Qm³ªYY<U˜F@D,:òW;\\Á\rW¨›‡{\î\Ñ7¡$ùÏ¡ZL>Àš÷\ÎN\ï^s\ã\áJåŸ¤]š\Ñ\Şh\Ôm¤:\ì¶Foƒ9„\ìûˆ\0ÁH\ßúõƒ\á¬=nÏ€÷fdƒ\0‹›\épcU­\Ú\Şğ´Ô¶\Ûúó\ÕK\×70\Êo?\"GPN‰\ê\É\İ3+³;?S8\Î\ËCI6Ÿ\ÔLN\à\Ò9©™\ÙLÀØ’.t\ZËœ,5\Ğ˜²\ĞT\Ç8eˆ\Äx<y\åóD`ñÁ\ÄÎ»¢7|Š5aº0ûK²—%³b\0E€\"‰:#š¦¯°\Ä$fhƒ\Ş0Lkz\ã\È\Ğó±ğLş‘\å§—*J³\Ä\Î\à‘\r\Í0t·\İ1^©¶;.şQ\ï0\0‰\Ô›k´v˜\àH0\âlY€4Ğ˜¾AI”À§J‰²¥!=6º\"£l¦\ËD©0í’›‘ƒ¥	a.³U{%‹©¹	M«\Ë5“¥A\Øe;Ü†¤T*\Ù1C¡\"\ËJ\åDö\è²5Äª×›«,b«yº¤\"\'aÊ›³\äE\"\n\Ñlº\"\Ë|¹W\nŠe%‚ò¹Š\Ù‚J\İ2˜göıQy‹\å\åyuğlñG[2mÓ¾’i’¦{¬½k9\è“‡Ì–+”£63„¥µœ%$ù\Z@o\Â\ËeWŠ}\åsN§uU“\ßT„\Ë*9šx0ösÁ\nŞ\0A\ß÷YJN\ÍRTT·\äŒ\ÂlğC†m	¼’;¤{ıg§DgMÁIñµ‹yòµÅ‰Ë—Ñ†l\ê.\Ë&\ãŒ-\Ï~|I]up\0uY\àwƒb.Ucª“i\ã?°\ÑF\ãš-¸®½R8^V\Økœm&E®\ât\é\Ş!Y\ì\ìx°\0:u\r\Ùv–¼hVb¥F\Å\Û<\É+˜lYˆÁ)E1\Æm3I´ˆ¦	d›\å2\İ\ÃP,@ö\n\îÇ¨)>!¦À\Ë`‘0`pº\ÎUÆ¿,J\åC¬f\êt\âŠüŸµ›6cY›¾\\\Âd\åv†×(\ê8–›G´XJ›f©´Û†£\ÕICm¸]\Ù|‚\É\ãf\ë*=®ñ©˜Œ_«Ağ\Ç\æV{fv™†\Äy-^³^%¦BŠ\ä\Ö\Ì6?²\ì2\ì E„€A6-\Ê÷^r¸½’úN‡¶	¸\Ş#‘Ş½‡kšC€\"7ğˆ>‹3·ğ/t@9@0\áPD8k9\İ\Ê%h¸»<øa\Ó\ÛA[Z`Øˆ‘;÷™\Ò9ò]ƒ[úY¶n’ ‚~h	µ\Ì!]Sr–\Í£¤\ÉD6’\î\n†ôMF\Â\Ïj`ù&\é\ÓÛ¢¶Æ÷¢ˆjMº)ú(,­\ÆV\ä~1\ê¹\Ê\Ñ$¸W\İköVb0º\Ó\à10™£g,Q¢\Å\â2µav¾\Ñ\ÌHW›KK\n\Â\â_\Ş+)[*R\â‚Ut\Ö*:XJ®Ò›ÿ\0´Çš6–Æ¬uhoW¤®úfIv\Î\á1yW1x\Ì\È\ê¿§ƒ~\çì£€Ã·òf<\\Iô\Ó\Ñ\nL\Şh”Xz\Î=Ö‚O\0	>ˆª;\ë\å\r^@ô¹ôWC\0†€Á\Ê P£™>/$ŸH\æd¹†]U½\Z}L+ˆÀ“ÎºB¸\æ\éº\İ	Fú2œòWaLªI\Õ=“h<%MgŞ©\Z†H\Z’µ¾m’â±¹lŸzªªøÚ“¨@\íı¶\Úá±¿¤I\roû\Ï\Ñc\ëö«š{ p\r\ë%=l\èŒ74ö›\Ûø„Hü>$óJ\Ë\Ğ\ÆU™V»@¦ù\íÕ¤k™¼9ú+\Ê\ëhoË‘R×¡¸š7&¾¤6q\ä \Ä<\êSd¸«Ç†q@\Òc\ßø‰É”i\çy<©T»o>ôğ\æ\00\çI\Ş\Z~ªÒ¾\ÊI#_‡¤\æƒ\Õi¶\Ö}2=\"¼w³ª>8\Ì\ÙM\İ\á\ÚÏŠôü6˜b\×Ò¨j\á\ŞCK%\ìcp-©¸$tQ’+\Ê4ƒO£\Öp¸†\Ô`xĞ>agö\æ4R£\î. ¸oòóSö`9­ \Ô\Í\Úm;¬á¸¬?höeW¶¡³^ñ\Ê\î\İ\ÕcwV7}.Ëª[L=¿\â;/\ë\0\Ï9¨ª\Ó\ÂT2Z\æ8\ïk§Ä‡J\Ã\Ö\Ú\ÅÇº-\Í9›Eû\Ö3œl\é\Çñó%f³\Ùğ\á4«1ÜŸ,>w\n¹™\ÄÌ–8‡°ıeGjh¦mÇ%EÁ—ü\Ñ\í\r\ÙOhüò*¿‡xüşÒ˜\Î\ÑU\Î>jvv–·ğQ¬o±\í?òT¹†n‘O\nù¢¬D–¶8›}S_·X\ïó(1\Ş^s	ş¾\ÖIz*¨µsø\n\Ç\êl\Ók˜\ëwM\ÚG7\n›\ä¨\Ñ;Ev-ò‚”UPƒpWC# ø*\ç	ˆTA„r\é’9bèµ¯nšû\àkö6<„=Uƒª€\Ş1»•\ÂuÒ£\ào\í&\Ëfm¢l\Ñ\æT§P\îõT\rj/‰sy\î”\å\'\Ó\Zøğ^\ë*Á2¶>©Sañ\ÔÍc\Ï\î‰8v;”Ñ´q\âòŠj˜Š‡|tC9®:’´ÀÃ€P\Û:ak¤Œ\å@Z$=U†iT\0f3óSb°r›O	h6\à„\äº5\ÓESE¦¶l\Ğxˆš4İ•\Äp\æO@\Ù\Ôr“<•¥3\îWv)mg‹›\ã\È\Ò<\Ûhc\\\ÌS\ØXO\â ´X\Ç4ü\Õ+\áù\ËO1\Ó\ÒÀ­Ÿhö,A$Ó¨,ƒÈ\ë1[²§ü\Ê.\æs\ä\Ñ9G¡8FK“›;nÒ¦\Ò%Åš\\wO¿\ÈW[\n s2‰\rüt\çP\ÒOw\Êş*»\Øñ \Õy|~V­\é˜\î\è††22´Ó—‰G/°¸\Ä?\ë(q€Å¦}T\Øb[r\Ùé»ª\î.¾a”2ÿ\0«pIU‰ò¬®æ‹˜Àd´’F¡»\àñYj5©AkZ\çe´—qË‚\Ú1§î†«±h¼’i‹\êD´“\Ï*RRğË„ \×(\Å;lAŠT/úœl:Àú«~\Éc«VÄ¸7,<ş]À4\Z[V§²˜bn*‘\Ã9=U\Ö\Ê#-66›yjy“¼õC\ßaÚ\Õ¯\ÙúLš\Zø I\êxş\Ë\Êûy…p\Æ\×õ:9¡\ßUº\ì\Î=€o×¨X\Ş\Ş\×ó?•ƒ\Ç(?\",ù\à\ìø\ïY\Û3M´‚	Jƒ(¬ÿ\0:%•Xš\Õ+)§\ÒÃ£iPTœ(\É\å!¡†•ağ\Ø\ÆÉ°õ<‚k«\è$ª\ÜMbL“ûtXÉ¤-›%«ˆ\Í}8\rÀ(\Å[¡U0UX\í\ÉI–¡öBb\n\ë+YBç®ˆ–\rX \\uŞ„%j€…¡>›\á1q\Åu3‘T\ÅYU\Õu\Ô\ä¡k!!\Øö¹89@Š(«Ìœ\Ú\ÄhH\è…c\Ó\å*§µ*\r\àõı”§m?x\nµ5\å-Q5\Éh\ÌcŸ0\İ:ª\ÊûQ\Ä9Åœõj³\Øôæ›\èò¨{I³\\;\íñG.ŠWw\è¹Áb\êo\èf8VObg-?\r¼$nó\ã\Ñ[T¬[jƒ/¯ª´\Õ\ÊÜ¹/[´÷óR[9,Ñ­À\ÙBú®;Ï¿’6`\Ò4õ±Ç¤.\á\ê±ßš~K3‡§›SõG³\á\Ê	\æIô)©³7\Íj³@BõX5#^!SS¢\Ü:@Mu\ê\ÖFfñ¢\ÑÕ©‹ƒ\ä•-¢\Î2¨ê¶–cO8æ£«wz{ºR“.1H\ĞT\Ç\r\ÈwbŠ£f$\r\ã\ß%Ú»IM­ \']{3eFÇ³øÜ¥\Ï{¡\Î<†\á\ÏwŠ¥\Îq_U\ÒœI\åÀ@[ÁQ\×\ÚŸÃŒ¬\Ì\Òne\Äf#p\á\Åh©P\î5”÷\Ç@½õYmMšò\Ë}Ÿ²\Zğrµ\Ä\r\âOœhŸSf9\Îh.kn\ïô‰‰<¥_vWğ€a$‰\0\ênl´¯\ÙÀ\Õ\Ì²£×£_l\Ä\Ò<öƒ¼Ç‚\ÎE\\÷9s­sšz´Áù.:º\å–FÊŠH’­D\rw§šŠ\n¥E@ê‰¿1\ê9R…€e:ë®¬«ó\'\æ[EQi“TrŠR\"¬c\\\Ô\ÇL)µœ¨«zú«J\ÔP5©Â¤À5Á8$‹-;:\ÄôÖ„¥Š:©\à©0¸sQ\á¢\Òu\à7Ÿ$	—»\"ˆ[;\Äù’Tx\Ú`ƒ\ïr(÷a­\Ğ@\0„-vÉ‰Qd”»9\ÃS!ü$·‘:¨W\ì({m}XŒ#swn1\Ò\ÍuJZw\Ù\Ãóºfzµ:”C\Ä\Ó\ÜF­\ê8\'Š\Ò,Al~\ëJÊ”\ë\rE\Öcjl\n\Ô\İ4´\ê\Ù)Ü©zfS‹\í|`lŸF°U­§‰o\â¤OB	ô)®\Ú`ˆ?¥\Âªzú\"\Ú4m\Ç\ÕGSÑ½g´[\Ã\çôM\Ã\ÖuC©—yÀ\êJ5h«²Ö¾/2\Z®0\rO†ÿ\0\ÙOCa\Õu\ê8Á¶Ü®p[“.\Z\'‰¹ó)6† \Ê\Zª\Õü\0´~§ş\Ö\ïDm+YOá‹¸I:˜¿\Ù^bj†‹*\n\ï.qŸT¬\ÑE\"<-\æ\ä\Z›¥zÎ§\rŒ˜x˜T]›\Ùn#\â¯\á\0\ã\Õlv~\r¦$Ü\×\ß÷Y×“Kğ[l,;]}ò4\Ô6\ëa…0\Ğ9’£Ø´ƒZ#K\ŞA±$:ÏŠ½ =ú,\î\ØÚ¤y\Çlp¿ó¹ğñÿ\0!\Şÿ\0°rÏ½\ë\Ñ{{²]R“j°I§9€\×!ÔÈR¼\Ñ\åc8\Ó\ZcÃ”nz\æeDP\ÎT(W\"£È´CĞ\ZSƒT”\ì®\ÊD:\'JU\ÔEÉ–\ßôšUœˆ•­•+ˆ¤T\Î	\Ø\è\ÏT¦‘iW\Ã›ı0…WcVU]t¢_B$YVF\Æ+-Œ\Ø.w©ş4\éX«-¬i$ù\é\èo‚X\ç>R\Ê5)\ÎPUtÀQb¢fÅ‡ğ£©O…\Ñ4›h÷	\áÁZFs…|üJVvñ¹Ñ¯CóQ\àö\Ä\Ù\Ú\ï›\Ô-1 \×n\ÕUm^Ï‡÷›\İw¿“†ğ«²:ıkjš59¡Üˆ\æ«ğİœÄ¸÷‹X?T\æ\' XF³³•ÿ\0‰û¥CØˆ\ì¼!ÿ\0\Ô\Ï(ù#h\ZLZ\Ğ\ÑÀ*LS*\ÓycõÆ„qO¤I‰E1\Ú4¬\Ş)µq#’³_R\ãº\ß\Ô~ƒz¼\ÂlZ-üRóş­<òŠe\r<\ë\í‡\ê6U¾aÒ¥r3¿‹´ği°V†„h˜\æZO_ˆ`˜œÿ\0§\î>~IR¬Aú\ê-nG\Õ6\"\ér\ã\Üú)e£_²k’\Û÷·~RgŸ\Êyx«\Ü%[p÷û,VÆ®\Z\á&&~@_œ-]\'Á\ßO ±ô\\\ï†k\Ú.C\Ö¶}”\0;D@‚^\Î{›Ëˆ[\n-c\ì§mA¢¾\Z\äÎšg…AºNj3jkTƒ#;¢4Œ\Æ#Á\nThÔ\á¦B$(KRaC!(O!(Lj1@i£HM,N\ÊG~`eÕD\ÇRµ2 v1<\Ù)¥ğe@Ù—w\'Õ§	´ÚŠ\n#4\ÂqÃ„Ch£)R\0I\×\åû M\Ğ.\Şw—\ß\ìV w‡\ÉG‹\ÅrÓ»½<O%Z¹\0\ZÆ¼\Îô6Gd\Óe\ÚlŞ˜\Û\é¿\ä¤q*J?„©j›M\ç\èœje\êš`\ĞU6ñ\nyâƒ§Xj¢\Äbúi\ë\ï\è©H–ƒ_‰h²¾2/0\"#WO ³¸¬\\Ha\ßw\ë\àßº3Sytg\Ü&\ä\Z\r\Ç`ª\Öp \0\ßõ™\ß\Ñ†\Ø\íó\Èh\Æ\×÷\ïÁ1\Î\Ö=ğ²6\r&\Õ\0@‹yG¿¢gõQ\çò\Ğzª\Ò\â:ziÁIñ-ü{Ü–\Ã\Ô<cczN\Æ*\ã}š\'½ş\É[ \áR|\ç‡U#|¼l‚m@7ùü‘ò<’g‡Ë˜^\ÜN\è\×\äµ8Z\â	›FŸ=V.…C§¾0´4v6Q\ÍQÁ­>v\0o$9,\æiMA\æÀq‹p<•wşECâº“‹˜\é€j4µCKµ–Gbö\Å\Ï\Ä´I¤7{\É\ç„L\Ëz\ĞvƒB½?†\ès³tX’z)Iƒ`} ì…¾.\í\Õ\Ôõ#3ù‡-z¬s‚ôíu&aM¿5¸–»ı7c¼\Úyj«ö¶É£©Cü<CmR›»¤¸nx\Ü\î\Ğú«±\'GŸ…\Ğ\Õğ\îa-sK\\lA\æ¸Æ Ô\á®dE6šc˜\È2®B˜S)¤2|·\\sS\Ş\äÏˆ†CœWh	z–’`,Kt˜¤yº\éxh“¿D\Én‡X$q<‚Š¾Qn\'ôºú¸¸‘­49a<ø\Å\ÇX\å¹Ga4œ\Z\Îu$ñUØ§\É1½ñ\0û\è`•\r”^ı\Ñ;¬>Èº·\Ëß’Oü8\ß)Øš¡š\éd\0U7\Ş8{ŸD\ÌA;”T*ƒ¹J[¬õ@\Îf·½fĞ¯4\ß2%®5ü3ô\ÅXwJ \Å\Ô\ÎğÁÿ\0.Bf<HJ‘![? o\ÑZÓ \Ş5ÿ\0”\ZQ¯ó}Œ¬-?ºVQ;)\ãNId9{ôLøƒP}\ÊE\ç¿D(ÿ\0e\ĞG\İ\n\ç{÷¢\á\Ä\rú}x\"À0¼i\ï¢Mwi\ëÁ\n\ÌO)ó÷½p\â9\"\ÅAov§ß¿ºã«†‹•Zú\Î2g\Ã÷Pï¹”¬tYÿ\0úvôDv’¶l6\ä\Åë³#ü7G©\n«\Ì\Î-ó]\í^ †Pd÷G\Ä s9\'\ß$©°¿}œ­q«\ä´\ÅE\æ\çE˜Ø\rfs¼\Øq\à\Å\0\\d\êU/D›~\Ê\íW‘ğ\Şg{OMB‹oT\'\ê´_–£`\r\0Hp\Ş5U\Û\Ö8“½¤FB”\â@¿”\İ\Z…‡\Öp\Ç2Ï‡Œcf4Y\È\ï\å:t\Ó2‚,A±jVŒSªœß†£`±\Â\ÄôVv{ñ˜\Ğ\Ú\ĞV\éœ\Çv«&\İ\á#¨YôiQ.T\n\\F\ìqk\ÚZ\á¨6*%\Ù\Ún	e\äº\ÊH¶S\Ø§¹7\à§\æ §\Z·\ÑjdF\ÊWN\ÈA\\{\Ó\ÙR\È7\ÑV´™!‹x…YR¬\Ì%dµ\ÈöVk]˜ğ…\r\\m¡¨LSŠ‹\İy\â\Ó\ÅA\ÎóDa°¥>…¢N¨¶F¢²Ÿ´.\"›[ú\Ñ\à\\#i‰Uİ«\ÅF^\rs“Á?%mŠd©ĞŒğcš\éi‚|¼U\î\\Á=:¡j\á­õL¤\×n:¡ ²leXúuûªŒu\ÎuA¼·})\İSq‰J˜\ìqÄ¶Ç‡\Ë\Ü%Oœyøê¢«G»`–Ï¥oW;ùRPX\Í\Ï%\Â\ßõE\è†\Äp=z EP5’yı—\\\0I\ç`MwL	ùıQ,o w\à4Oh\å\ï\ê“X¥4„\ÙH\nR$ÀSŠs\ÑJhN…c°´C}\êª{YL¸\Ğoû\çşŠ\é¯T½¬­”R O\âü”\Äú†D~\Ø}J·Ùµ¦\Æ4¶\ê\Ãcº\ß%£KMœi\Ê7¸UøjğG»«?\ê†X!Z¢‘7\ákv6\Öiøm\05\Í`k»\İ\ék5İ¬ÁŒÇš\Æb ‡¢šBØƒ\ãòPÕ”J\Ú{2*œ:\Ï…\ÛÁ\á\ÌqÎ±˜wS¨Xñiƒ÷–Ó³»X<CxD\Éÿ\0W\İVöÿ\03\Óx‰s\\<¤G\ÍIK†g3©ZP´\Øw¢CS,\ÕAÜ†­VVfpW\äº\ìD$’tO®\Óm\ÅUÔ–ºò<RI&NvˆZ¢\r¹$’@YlüIxƒ¨õ\İ*Æ­V°\\¤’»¤K\\˜\Ş\Õ\Õ.k½\ïI²q&¦“©hŸOŒOŠI#ú‰ö—¤.„’JÀ(\à›Q¶ó]I&Æ.®[6\ç’\'N_P:eù”’Hl)\çw46,Xô>\å$„\r9ğù\"\Ñ$•$!\í©iÑŸvI%T‰ù¾\Ú$’–\Ø<½Êª\ía\î3«‡ û$’7Ô³ºÛ¢\Ô\ì\à28	I$™h=\ê¦v0\å$”_# ªy©\ÂI*V\æ¸c\ç¿U{ÚœVvĞŸ\Å$r9`úz.$¥ö4gC¸¥ñRIŸÿ\Ù','teacher','$2a$10$v4T0Fn4Sk9w3eziDMWlEhOXUT5nBBLllrZ24m6iGzpZBe1W.Z1DZq'),(2345,'Andrea','Montes',4,1,'amontes@uach.mx','Lopez',_binary 'n','teacher','$2a$10$rt31Ytrqq8w.AWQjUKWQEusuXI48Cx0MPb9Cta360P6yP8SjbaGXS'),(4587,'Victor','Solis',9,0,'vsolis@uach.mx','Madrid',_binary 'n','teacher','$2a$10$Yz/lSdOjZJDBskKkdyt3D.1ydrKtcOJ5h6AxDDFFoO29CAt3Sex0i'),(9876,'Pedro','Solis',3,0,'psolis@uach.mx','Garcia',_binary 'n','teacher','$2a$10$NaLYIdmG42grYan14cMWL.mC/eCZIErasqXeSOgJpkUQ3oO6qa6Ee');
/*!40000 ALTER TABLE `docentes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-19 20:46:25
