/**
 Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
 http://aws.amazon.com/apache2.0/
 or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * This sample shows how to create a simple Flash Card skill. The skill
 * supports 1 player at a time, and does not support games across sessions.
 */

'use strict';

/**
 * When editing your questions pay attention to your punctuation. Make sure you use question marks or periods.
 * Make sure the first answer is the correct one. Set at least 4 answers, any extras will be shuffled in.
 */
var questions = [
    {
        "What muscle has the origin: Medial and lateral processes of posterior calcaneal tuberosity. Insertion: Lateral side of base of proximal phalanx of 5th toe and 5th metatarsal?": [
            "ABDUCTOR DIGITI MINIMI (foot)"
        ]
    },
    {
        "What muscle has the origin: Pisiform bone, pisohamate ligament and flexor retinaculum. Insertion: Ulnar side of base of proximal phalanx of little finger and extensor expansion?": [
            "ABDUCTOR DIGITI MINIMI (hand)"

        ]
    },
    {
        "What muscle has the origin: Medial process of posterior calcaneal tuberosity & flexor retinaculum. Insertion: Medial aspect of base of proximal phalanx of big toe via medial sesamoid?": [
            "ABDUCTOR HALLUCIS"
        ]
    },
    {
        "What muscle has the origin: Tubercle of scaphoid & flexor retinaculum. Insertion: Radial sesamoid of proximal phalanx of thumb & tendon of extensor pollicis longus?": [
            "ABDUCTOR POLLICIS BREVIS"
        ]
    },
    {
        "What muscle has the origin: Upper posterior surface of ulna and middle third of posterior surface of radius and interosseous membrane between. Insertion: Over tendons of radial extensors and brachioradialis to base of 1st metacarpal and trapezium?": [
            "ABDUCTOR POLLICIS LONGUS"
        ]
    },
    {
        "What muscle has the origin: Inferior ramus and body of pubis. Insertion: Upper third of linea aspera?": [
            "ADDUCTOR BREVIS"
        ]
    },
    {
        "What muscle has the origin: Oblique head: base of 2, 3, 4 metatarsals. Transverse head: plantar metatarsal ligaments and deep transverse ligament. Insertion: Lateral side of base of proximal phalanx of big toe and lateral sesamoid?": [
            "ADDUCTOR HALLUCIS"
        ]
    },
    {
        "What muscle has the origin: Body of pubis inferior and medial to pubic tubercle. Insertion: Lower two thirds of medial linea aspera?": [
            "ADDUCTOR LONGUS"
        ]
    },
    {
        "What muscle has the origin: Adductor portion: ischiopubic ramus. Hamstring portion: lower outer quadrant of posterior surface of ischial tuberosity. Insertion: Adductor portion: lower gluteal line and linea aspera. Hamstring portion: adductor tubercle?": [
            "ADDUCTOR MAGNUS"
        ]
    },
    {
        "What muscle has the origin: Oblique head: base of 2nd and 3rd metacarpals, trapezoid and capitate. Transverse head: palmar border and shaft of 3rd metacarpal. Insertion: Ulnar sesamoid then ulnar side of base of proximal phalanx and tendon of extensor pollicis longus?": [
            "ADDUCTOR POLLICIS"
        ]
    },
    {
        "What muscle has the origin: Smooth surface at lower extremity of posterior aspect of lateral epicondyle of humerus. Insertion: Lateral side of olecranon?": [
            "ANCONEUS"
        ]
    },
    {
        "What muscle has the origin: Deep distal surface of medial head of triceps. Insertion: Posterior capsule of elbow joint?": [
            "ARTICULARIS CUBITI"
        ]
    },
    {
        "What muscle has the origin: Two slips from anterior femur below vastus intermedialius. Insertion: Apex of suprapatellar bursa?": [
            "ARTICULARIS GENU"
        ]
    },
    {
        "What muscle has the origin: Apex of arytenoid cartilage. Insertion: Lateral border of epiglottis?": [
            "ARYEPIGLOTTICUS"
        ]
    },
    {
        "What muscle has the origin: Cartilage of auricle. Insertion: Galeal aponeurosis?": [
            "AURICULARIS"
        ]
    },
    {
        "What muscle has the origin: Long head:supraglenoid tubercle of scapula. Short head: coracoid process of scapula with coracobrachialis. Insertion: posterior border of bicipital tuberosity of radius (over bursa) and bicipital aponeurosis to deep fascia and subcutaneous ulna?": [
            "BICEPS BRACHII"
        ]
    },
    {
        "What muscle has the origin: Long head: upper inner quadrant of posterior surface of ischial tuberosity. Short head:middle third of linea aspera, lateral supracondylar ridge of femur. Insertion: Styloid process of head of fibula. lateral collateral ligament and lateral tibial condyle?": [
            "BICEPS FEMORIS"
        ]
    },
    {
        "What muscle has the origin: Anterior lower half of humerus and medial and lateral intermuscular septa. Insertion: Coronoid process and tuberosity of ulna?": [
            "BRACHIALIS"
        ]
    },
    {
        "What muscle has the origin: Upper two thirds of lateral supracondylar ridge of humerus and lateral intermuscular septum. Insertion: Base of styloid process of radius?": [
            "BRACHIORADIALIS"
        ]
    },
    {
        "What muscle has the origin: External alveolar margins of maxilla and mandible by molar teeth, to maxillary tubercle and pterygoid hamulus and posterior mylohyoid line respectively, then via pterygomandibular raphe between bones. Insertion: Decussates at modiolus of mouth and interdigitates with opposite side?": [
            "BUCCINATOR"
        ]
    },
    {
        "What muscle has the origin: Perineal body (and midline raphe over corpus spongiosum in male). Insertion: Superficial perineal membrane and dorsal penile/clitoral aponeurosis?": [
            "BULBOSPONGIOSUS"
        ]
    },
    {
        "What muscle has the origin: Cricopharyngeus: lateral aspect of arch of cricoid cartilage. Thyropharyngeus: oblique line of laminar of thyroid cartilage and fibrous cricothyroid arch. Insertion: Cricopharyngeus: continuous with muscle of opposite side, behind pharynx. Thyropharyngeus : lower pharyngeal raphe?": [
            "INFERIOR CONSTRICTOR"
        ]
    },
    {
        "What muscle has the origin: Lower third of stylohyoid ligament, lesser cornu and superior border of greater cornu of hyoid bone. Insertion: Middle portion of pharyngeal raphe?": [
            "MIDDLE CONSTRICTOR"
        ]
    },
    {
        "What muscle has the origin: Lower two thirds of medial pterygoid plate, pterygomandibular raphe and posterior end of mylohyoid line on mandible. Insertion: Upper midline pharyngeal raphe and pharyngeal tubercle of clivus of occiput?": [
            "SUPERIOR CONSTRICTOR"
        ]
    },
    {
        "What muscle has the origin: Coracoid process of scapula with biceps brachii. Insertion: Upper half medial border of humerus?": [
            "CORACOBRACHIALIS"
        ]
    },
    {
        "What muscle has the origin: Medial superciliary arch. Insertion: Skin of medial forehead?": [
            "CORRUGATOR SUPERCILII"
        ]
    },
    {
        "What muscle has the origin: Lower border of internal oblique and transversus abdominis in inguinal canal. Insertion: Loops around spermatic cord and tunica vaginalis and some fibers return to attach to pubic tubercle?": [
            "CREMASTER"
        ]
    },
    {
        "What muscle has the origin: Anterolateral aspect of cricoid cartilage. Insertion: Inferior cornu and lower laminar of thyroid cartilage?": [
            "CRICOTHYROID"
        ]
    },
    {
        "What muscle has the origin: Subcutaneous tissue of scrotum, superficial to superficial fascia (Colles). Insertion: Skin and midline fibrous septum of scrotum?": [
            "DARTOS"
        ]
    },
    {
        "What muscle has the origin: Medial aspect of ischiopubic ramus and body of ischium. Insertion: Midline raphe and perineal body?": [
            "DEEP TRANSVERSE PERINEI"
        ]
    },
    {
        "What muscle has the origin: Lateral third of clavicle, acromion, spine of scapula to deltoid tubercle. Insertion: Middle of lateral surface of humerus (deltoid tuberosity)?": [
            "DELTOID"
        ]
    },
    {
        "What muscle has the origin: Outer surface of mandible posterior to oblique line. Insertion: Modiolus at angle of mouth?": [
            "DEPRESSOR ANGULI ORIS"
        ]
    },
    {
        "What muscle has the origin: Outer surface of mandible along oblique line. Insertion: Skin of lower lip?": [
            "DEPRESSOR LABII INFERIORIS"
        ]
    },
    {
        "What muscle has the origin: Vertebral:crura from bodies of L1, 2 (left), L1-3 (right). Costal: medial and lateral arcuate ligs, inner aspect of lower six ribs . Sternal: two slips from posterior aspect of xiphoid. Insertion: Central tendon?": [
            "DIAPHRAGM"
        ]
    },
    {
        "What muscle has the origin: Anterior belly: digatric fossa on posterior surface of symphysis menti. posterior belly: base of medial aspect of mastoid process. Insertion: Fibrous loop to lesser cornu of hyoid bone?": [
            "DIGASTRIC"
        ]
    },
    {
        "What muscle has the origin: Spinous processes. Insertion: Spinous processes six levels above?": [
            "ERECTOR SPINAE-SPINALIS"
        ]
    },
    {
        "What muscle has the origin: Iliac crest, sacrum, lumbar vertebrae. Insertion: Ribs, cervical transverse processes?": [
            "ERECTOR SPINAE-ILIOCOSTALIS"
        ]
    },
    {
        "What muscle has the origin: Transverse processes. Insertion: Transverse processes several levels above?": [
            "ERECTOR SPINAE-LONGISSIMUS"
        ]
    },
    {
        "What muscle has the origin: Common extensor origin on anterior aspect of lateral epicondyle of humerus. Insertion: Posterior base of 3rd metacarpal?": [
            "EXTENSOR CARPI RADIALIS BREVIS"
        ]
    },
    {
        "What muscle has the origin: Lower third of lateral supracondylar ridge of humerus and lateral intermuscular septum. Insertion: Posterior base of 2nd metacarpal?": [
            "EXTENSOR CARPI RADIALIS LONGUS"
        ]
    },
    {
        "What muscle has the origin: Common extensor origin on anterior aspect of lateral epicondyle of humerus. Insertion: Base of 5th metacarpal via groove by ulnar styloid?": [
            "EXTENSOR CARPI ULNARIS"
        ]
    },
    {
        "What muscle has the origin: Common extensor origin on anterior aspect of lateral epicondyle of humerus. Insertion: Extensor expansion of little finger-usually two tendons which are joined by a slip from extensor digitorum at metacarpophalangeal joint?": [
            "EXTENSOR DIGITI MINIMI HAND"
        ]
    },
    {
        "What muscle has the origin: Common extensor origin on anterior aspect of lateral epicondyle of humerus. Insertion: External expansion to middle and distal phalanges by four tendons. Tendons 3 and 4 usually fuse and little finger just receives a slip?": [
            "EXTENSOR DIGITORUM HAND"
        ]
    },
    {
        "What muscle has the origin: Superior surface of anterior calcaneus. Insertion: Four tendon into proximal phalanx of big toe and long extensor tendons to toes 2, 3 and 4?": [
            "EXTENSOR DIGITORUM BREVIS"
        ]
    },
    {
        "What muscle has the origin: Upper two thirds of anterior shaft of fibula, interosseous membrane and superior tibiofibular joint. Insertion: Extensor expansion of lateral four toes?": [
            "EXTENSOR DIGITORUM LONGUS"
        ]
    },
    {
        "What muscle has the origin: Superior surface of anterior calcaneus. Insertion: Proximal phalanx of big toe?": [
            "EXTENSOR HALLUCIS BREVIS"
        ]
    },
    {
        "What muscle has the origin: Middle half of anterior shaft of fibula. Insertion: Base of distal phalanx of great toe?": [
            "EXTENSOR HALLUCIS LONGUS"
        ]
    },
    {
        "What muscle has the origin: Lower posterior shaft of ulna (below extensor pollicis longus) and adjacent interosseous membrane. Insertion: Extensor expansion of index finger (tendon lies on ulnar side of extensor digitorum tendon)?": [
            "EXTENSOR INDICIS"
        ]
    },
    {
        "What muscle has the origin: Lower third of posterior shaft of radius and adjacent interosseous membrane. Insertion: Over tendons of radial extensors and brachioradialis to base of proximal phalanx of thumb?": [
            "EXTENSOR POLLICIS BREVIS FOOT"
        ]
    },
    {
        "What muscle has the origin: Middle third of posterior ulna (below abductor pollicis longus) and adjacent interosseous membrane. Insertion: Base of distal phalanx of thumb via Lister's tubercle (dorsal tubercle of radius)?": [
            "EXTENSOR POLLICIS LONGUS FOOT"
        ]
    },
    {
        "What muscle has the origin: Anterior angles of lower eight ribs. Insertion: Outer anterior half of iliac crest, inguinal lig, public tubercle and crest, and aponeurosis of anterior rectus sheath?": [
            "EXTERNAL ABDOMINAL OBLIQUE"
        ]
    },
    {
        "What muscle has the origin: Common flexor origin of medial epicondyle of humerus. Insertion: Bases of 2nd and 3rd metacarpals via groove in trapezium and slip to scaphoid?": [
            "FLEXOR CARPI RADIALIS"
        ]
    },
    {
        "What muscle has the origin: Humeral head: common flexor origin of medial epicondyle. Ulnar head: aponeurosis from medial olecranon and upper three quarters subcutaneous border of ulna. Insertion: Pisiform, hook of hamate, base of 5th metacarpal via pisohamate and pisometacarpal ligaments?": [
            "FLEXOR CARPI ULNARIS"
        ]
    },
    {
        "What muscle has the origin: Base of 5th metatarsal and sheath of peroneus longus. Insertion: Lateral side of base of proximal phalanx of little toe?": [
            "FLEXOR DIGITI MINIMI BREVIS FOOT"
        ]
    },
    {
        "What muscle has the origin: Flexor retinaculum and hook of hamate. Insertion: Ulnar side of base of proximal phalanx of little finger?": [
            "FLEXOR DIGITI MINIMI BREVIS HAND"
        ]
    },
    {
        "What muscle has the origin: Medial process of posterior calcaneal tuberosity. Insertion: Four tendons to four lateral toes to borders of middle phalanx.Tendons of flexor digitorum longus pass through them?": [
            "FLEXOR DIGITORUM BREVIS"
        ]
    },
    {
        "What muscle has the origin: Posterior shaft of tibia below soleal line and by broad aponeurosis from fibula. Insertion: Base of distal phalanges of lateral four toes?": [
            "FLEXOR DIGITORUM LONGUS FOOT"
        ]
    },
    {
        "What muscle has the origin: Medial olecranon, upper three quarters of anterior and medial surface of ulna as far round as subcutaneous border and narrow strip of interosseous membrane. Insertion: Distal phalanges of medial four fingers. Tendon to index finger separates early?": [
            "FLEXOR DIGITORUM PROFUNDUS"
        ]
    },
    {
        "What muscle has the origin: Humeral head: common flexor origin of medial epicondyle humerus, medial ligament of elbow. Ulnar head: medial border of coronoid process and fibrous arch. Radial head: whole length of anterior oblique line. Insertion: Tendons split to insert onto sides of middle phalanges of medial four fingers?": [
            "FLEXOR DIGITORUM SUPERFICIALIS"
        ]
    },
    {
        "What muscle has the origin: Cuboid, lateral cuneiform and tibialis posterior insertion over the two remaining cuneiforms. Insertion: Medial tendon to medial side of base of proximal phalanx of big toe. Lateral tendon to lateral side of same, both via sesamoids?": [
            "FLEXOR HALLUCIS BREVIS"
        ]
    },
    {
        "What muscle has the origin: Lower two thirds of posterior fibula between median crest and posterior border, lower intermuscular septum and aponeurosis of flexor digitorum longus. Insertion: Base of distal phalanx of big toe and slips to medial two tendons of flexor digitorum longus?": [
            "FLEXOR HALLUCIS LONGUS"
        ]
    },
    {
        "What muscle has the origin: Flexor retinaculum and tubercle of trapezium. Insertion: Base of proximal phalanx of thumb (via radial sesamoid)?": [
            "FLEXOR POLLICIS BREVIS"
        ]
    },
    {
        "What muscle has the origin: Anterior surface of radius below anterior oblique line and adjacent interosseous membrane. Insertion: Base of distal phalanx of thumb?": [
            "FLEXOR POLLICIS LONGUS"
        ]
    },
    {
        "What muscle has the origin: Occipital : highest nuchal line and mastoid process. Frontal: superior fibers of upper facial muscles. Insertion: Galeal aponeurosis?": [
            "FRONTALIS"
        ]
    },
    {
        "What muscle has the origin: Lateral head: posterior surface of lateral condyle of femur and highest of three facets on lateral condyle. medial head: posterior surface of femur above medial condyle. Insertion: Tendo calcaneus to middle of three facets on posterior aspect of calcaneus?": [
            "GASTROCNEMIUS"
        ]
    },
    {
        "What muscle has the origin: Upper border of ischial tuberosity. Insertion: Middle part of medial aspect of greater trochanter of femur?": [
            "GEMELLUS INFERIOR"
        ]
    },
    {
        "What muscle has the origin: Spine of ischium. Insertion: Middle part of medial aspect of greater trochanter of femur?": [
            "GEMELLUS SUPERIOR"
        ]
    },
    {
        "What muscle has the origin: Superior mental spine on posterior surface of symphysis menti. Insertion: Central mass of tongue and mucous membrane?": [
            "GENIOGLOSSUS"
        ]
    },
    {
        "What muscle has the origin: Inferior mental spine on posterior surface of symphysis menti. Insertion: Superior border of body of hyoid bone?": [
            "GENIOHYOID"
        ]
    },
    {
        "What muscle has the origin: Outer surface of ilium behind posterior gluteal line and posterior third of iliac crest lumbar fascia, lateral mass of sacrum, sacrotuberous ligament and coccyx. Insertion: Deepest quarter into gluteal tuberosity of femur, remaining three quarters into iliotibial tract (anterior surface of lateral condyle of tibia)?": [
            "GLUTEUS MAXIMUS"
        ]
    },
    {
        "What muscle has the origin: Outer surface of ilium between posterior and middle gluteal lines. Insertion: Posterolateral surface of greater trocanter of femur?": [
            "GLUTEUS MEDIUS"
        ]
    },
    {
        "What muscle has the origin: Outer surface of ilium between middle and inferior gluteal lines. Insertion: Anterior surface of greater trochanter of femur?": [
            "GLUTEUS MINIMUS"
        ]
    },
    {
        "What muscle has the origin: Outer surface of ischiopubic ramus. Insertion: Upper medial shaft of tibia below sartorius?": [
            "GRACILIS"
        ]
    },
    {
        "What muscle has the origin: Superior border of greater cornu of hyoid bone. Insertion: Lateral sides of tongue?": [
            "HYOGLOSSUS"
        ]
    },
    {
        "What muscle has the origin: Iliac fossa within abdomen. Insertion: Lowermost surface of lesser trochanter of femur?": [
            "ILIACUS"
        ]
    },
    {
        "What muscle has the origin: Orbital surface of maxilla behind orbital margin. Insertion: Post/inferior quadrant of sclera behind equator of eyeball?": [
            "INFERIOR OBLIQUE"
        ]
    },
    {
        "What muscle has the origin: Inferior tendinous ring within orbit. Insertion: Inferior sclera anterior to equator of eyeball?": [
            "INFERIOR RECTUS"
        ]
    },
    {
        "What muscle has the origin: Medial three quarters of infraspinous fossa of scapula and fibrous intermuscular septa. Insertion: Middle facet of greater tuberosity of humerus and capsule of shoulder joint?": [
            "INFRASPINATUS"
        ]
    },
    {
        "What muscle has the origin: Inferior border of ribs as far back as posterior angles. Insertion: Superior border of ribs below, passing obliquely downwards and backwards?": [
            "EXTERNAL INTERCOSTALS"
        ]
    },
    {
        "What muscle has the origin: Internal aspect of ribs above and below. Insertion: Internal aspect of ribs above and below?": [
            "INNERMOST INTERCOSTALS"
        ]
    },
    {
        "What muscle has the origin: Inferior border of ribs as far back as posterior angles. Insertion: Superior border of ribs below , passing obliquely downwards and backwards?": [
            "INTERNAL INTERCOSTALS"
        ]
    },
    {
        "What muscle has the origin: Lumbar fascia, anterior two thirds of iliac crest and lateral two thirds of inguinal ligament. Insertion: Costal margin, aponeurosis of rectus sheath (anterior and posterior ), conjoint tendon to pubic crest and pectineal line?": [
            "INTERNAL ABDOMINAL OBLIQUE"
        ]
    },
    {
        "What muscle has the origin: Bipennate from inner aspects of shafts of all metacarpals. Insertion: Proximal phalanges and dorsal extensor expansion on radial side of index and middle fingers and ulnar side of middle and ring fingers?": [
            "DORSAL INTEROSSEI Hand"
        ]
    },
    {
        "What muscle has the origin: Bipennate from inner aspects of shafts of all metatarsals. Insertion: Bases of proximal phalanges and dorsal extensor expansions of medial side of 2nd toe and lateral sides of 2nd , 3rd and 4th toes?": [
            "DORSAL INTEROSSEI (FOOT)"
        ]
    },
    {
        "What muscle has the origin: Anteriorshafts of 2, 4, 5 metacarpals (unipennate). Insertion: Proximal phalanges and dorsal extensor expansion on ulnar side of index and radial side of ring and little fingers and to ulnar sesamoid of thumb?": [
            "PALMAR INTEROSSEI"
        ]
    },
    {
        "What muscle has the origin: Inferomedial shafts of 3rd , 4th and 5th metatarsals (single heads). Insertion: Medial sides of bases of proximal phalanges with slips to dorsal extensor expansions of 3rd, 4th and 5th toes?": [
            "PLANTAR INTEROSSEI"
        ]
    },
    {
        "What muscle has the origin: Spinous processes. Insertion: Spinous processes one above?": [
            "INTERSPINALIS"
        ]
    },
    {
        "What muscle has the origin: Transverse processes. Insertion: Transverse processes one above?": [
            "INTERTRANSVERSARII"
        ]
    },
    {
        "What muscle has the origin: Superior and inferior longitudinal, transverse and vertical elements. Insertion: Mucous membrane, septum and other muscles of tongue?": [
            "INTRINSIC MUSCLE OF TONGUE"
        ]
    },
    {
        "What muscle has the origin: Medial aspect of ischium and ischiopubic ramus. Insertion: Inferolateral aponeurosis over crura of penis /clitoris?": [
            "ISCHIOCAVERNOSUS"
        ]
    },
    {
        "What muscle has the origin: Lateral aspect of arch of cricoid. Insertion: Muscular process of arytenoid cartilage?": [
            "LATERAL CRICOARYTENOID"
        ]
    },
    {
        "What muscle has the origin: Upper head: infratemporal surface of sphenoid bone. Lower head: lateral surface of lateral pterygoid plate. Insertion: Pterygoid fovea below condyloid process of mandible and intra-articular cartilage of temporomandibular joint?": [
            "LATERAL PTERYGOID"
        ]
    },
    {
        "What muscle has the origin: Lateral tendinous ring within orbit. Insertion: Lateral sclera anterior to equator of eyeball?": [
            "LATERAL RECTUS"
        ]
    },
    {
        "What muscle has the origin: Spine T7, spinous processes and supraspinous ligaments of all lower thoracic, lumbar and sacral vertebrae, lumbar fascia, posterior third iliac crest, last four ribs (interdigitating with external oblique abdominis) and inferior angle of scapula. Insertion: Floor of bicipital groove of humerus after spiraling around teres major?": [
            "LATISSIMUS DORSI"
        ]
    },
    {
        "What muscle has the origin: Anterior surface of maxilla below infraorbital foramen. Insertion: Outer end of upper lip and modiolus?": [
            "LEVATOR ANGULI ORIS"
        ]
    },
    {
        "What muscle has the origin: Sacrospinous ligament. Insertion: Anococcygeal body and coccyx?": [
            "COCCYGEUS"
        ]
    },
    {
        "What muscle has the origin: Posterior half of fascial line over obturator internus and ischial spine. Insertion: Anococcygeal body?": [
            "ILIOCOCCYGEUS"
        ]
    },
    {
        "What muscle has the origin: Posterior surface of pubis and anterior half of fascial line over obturator internus. Insertion: Anococcygeal body?": [
            "PUBOCOCCYGEUS"
        ]
    },
    {
        "What muscle has the origin: Posterior surface of pubis. Insertion: Midline sling posterior to rectum?": [
            "PUBORECTALIS"
        ]
    },
    {
        "What muscle has the origin: Posterior surface of pubis. Insertion: Midline raphe posterior to vagina /prostate?": [
            "PUBOVAGINALIS"
        ]
    },
    {
        "What muscle has the origin: Medial infra-orbital margin. Insertion: Skin and muscle of upper lip?": [
            "LEVATOR LABII SUPERIORIS"
        ]
    },
    {
        "What muscle has the origin: Upper frontal process of maxilla. Insertion: Skin of lateral nostril and upper lip?": [
            "LEVATOR LABII SUPERIORIS ALAEQUE NASI"
        ]
    },
    {
        "What muscle has the origin: Inferior aspect of lesser wing of sphenoid bone. Insertion: Superior tarsal plate and skin of upper eyelid?": [
            "LEVATOR PALPEBRAE SUPERIORIS"
        ]
    },
    {
        "What muscle has the origin: Posterior tubercles of transverse processes of C1-4. Insertion: Upper part of medial border of scapular?": [
            "LEVATOR SCAPULAE"
        ]
    },
    {
        "What muscle has the origin: Apex of inferior surface of petrous temporal bone and medial rim of auditory tube. Insertion: Palatine aponeurosis?": [
            "LEVATOR VELI PALATINI"
        ]
    },
    {
        "What muscle has the origin: Transverse processes C7 to T11. Insertion: Posterior surface and angle of rib below?": [
            "LEVATORES COSTARUM"
        ]
    },
    {
        "What muscle has the origin: Anterior tubercles of transverse proceses of C3-6. Insertion: Anterior basilar occipital bone?": [
            "LONGUS CAPITUS"
        ]
    },
    {
        "What muscle has the origin: Anterior body of T1-3, anterior tubercles of transverse processes of C3-7. Insertion: Anterior arch of atlas (C1) and bodies of C2-4?": [
            "LONGUS COLLI"
        ]
    },
    {
        "What muscle has the origin: Lateral 3: bipennate origin from cleft between the four tendons of flexor digitorum longus . medial 1: unipennate origin from medial aspect of 1st tendon. Insertion: Dorsal extensor expansion?": [
            "LUMBRICALS of the foot"
        ]
    },
    {
        "What muscle has the origin: Four tendons of flexor digitorum profundus. Radial 2: radial side only (unipennate). Ulnar 2: cleft between tendons ( bipennate). Insertion: Extensor expansion (dorsum of proximal phalanx ) of fingers 2-5 radial side?": [
            "LUMBRICALS of the hand"
        ]
    },
    {
        "What muscle has the origin: Anterior two thirds of zygomatic arch and zygomatic process of maxilla. Insertion: Lateral surface of angle and lower ramus of mandible?": [
            "MASSETER"
        ]
    },
    {
        "What muscle has the origin: Deep head medial side of lateral pterygoid plate and fossa between medial and lateral plates . Superficial head : Tuberosity of maxilla and pyramidal process of palatine bone. Insertion: Medial aspect of angle of mandible?": [
            "MEDIAL PTERYGOID"
        ]
    },
    {
        "What muscle has the origin: Medial tendinous ring within orbit. Insertion: Medial sclera anterior to equator of eyeball?": [
            "MEDIAL RECTUS"
        ]
    },
    {
        "What muscle has the origin: Incisive fossa on anterior aspect of mandible. Insertion: Skin of chin?": [
            "MENTALIS"
        ]
    },
    {
        "What muscle has the origin: Posterior border of hard palate. Insertion: Palatine aponeurosis?": [
            "M. UVULAE"
        ]
    },
    {
        "What muscle has the origin: Mylohyoid line on internal aspect of mandible. Insertion: Anterior three quarters : midline raphe. posterior quarter: superior border of body of hyoid bone?": [
            "MYLOHYOID"
        ]
    },
    {
        "What muscle has the origin: Frontal process of maxilla. Insertion: Nasal aponeurosis?": [
            "NASALIS"
        ]
    },
    {
        "What muscle has the origin: Muscular process of arytenoid cartilage. Insertion: superior pole of opposite arytenoid cartilage?": [
            "OBLIQUE ARYTENOID"
        ]
    },
    {
        "What muscle has the origin: Spinous process of axis (C2). Insertion: Lateral mass of atlas (C1)?": [
            "OBLIQUUS CAPITIS INFERIOR"
        ]
    },
    {
        "What muscle has the origin: Lateral mass of atlas (C1). Insertion: Lateral half inferior nuchal line?": [
            "OBLIQUUS CAPITIS SUPERIOR"
        ]
    },
    {
        "What muscle has the origin: Outer obturator membrane , rim of pubis and ischium bordering it. Insertion: Trochanteric fossa on medial surface of greater trochanter?": [
            "OBTURATOR EXTERNUS"
        ]
    },
    {
        "What muscle has the origin: Inner surface of obturator membrane and rim of pubis and ischium bordering membrane. Insertion: Middle part of medial aspect of greater trochanter of femur?": [
            "OBTURATOR INTERNUS"
        ]
    },
    {
        "What muscle has the origin: Suprascapular ligament and adjacent scapula. Insertion: Inferior border of body of hyoid bone?": [
            "OMOHYOID"
        ]
    },
    {
        "What muscle has the origin: Flexor retinaculum and hook of hamate. Insertion: Ulnar border of shaft of 5th metacarpal?": [
            "OPPONEN DIGITI MINIMI HAND"
        ]
    },
    {
        "What muscle has the origin: Flexor retinaculum and tubercle of trapezium. Insertion: Whole of radial border of 1st metacarpal?": [
            "OPPONEN POLLICIS"
        ]
    },
    {
        "What muscle has the origin: Medial orbital margin and lacrimal sac (orbital, palpebral and lacrimal parts). Insertion: Lateral palpebral raphe?": [
            "ORBICULARIS OCULI"
        ]
    },
    {
        "What muscle has the origin: Near midline on anterior surface of maxilla and mandible and modiolus at angle of mouth. Insertion: Mucous membrane of margin of lips and raphe with buccinator at modiolus?": [
            "ORBICULARIS ORIS"
        ]
    },
    {
        "What muscle has the origin: Palatine aponeurosis. Insertion: Posterolateral tongue?": [
            "PALATOGLOSSUS"
        ]
    },
    {
        "What muscle has the origin: Palatine aponeurosis and posterior margin of hard palate. Insertion: Upper border of thyroid cartilage and blends with constrictor fibers. Upper fibers interdigitate with opposite side?": [
            "PALATOPHARYNGEUS"
        ]
    },
    {
        "What muscle has the origin: Flexor retinaculum and palmar aponeurosis. Insertion: Skin of palm into dermis?": [
            "PALMARIS BREVIS"
        ]
    },
    {
        "What muscle has the origin: Common flexor origin of medial epicondyle of humerus. Insertion: Flexor retinaculum and palmar aponeurosis?": [
            "PALMARIS LONGUS"
        ]
    },
    {
        "What muscle has the origin: Pectineal line of pubis and narrow area of superior pubic ramus below it. Insertion: A verticle line between spiral line and gluteal crest below lesser trochanter of femur?": [
            "PECTINEUS"
        ]
    },
    {
        "What muscle has the origin: Clavicular head-medial half clavicle. Sternocostal head-lateral manubrium and sternum, six upper costal cartilages and external oblique aponeurosis. Insertion: Lateral lip of bicipital groove of humerus and anterior lip of deltoid tuberosity?": [
            "PECTORALIS MAJOR"
        ]
    },
    {
        "What muscle has the origin: 3, 4, 5 ribs. Insertion: Medial and upper surface of coracoid process of scapula?": [
            "PECTORALIS MINOR"
        ]
    },
    {
        "What muscle has the origin: Lower two thirds lateral shaft of fibula. Insertion: Tuberosity of base of 5th metatarsal?": [
            "PERONEUS BREVIS"
        ]
    },
    {
        "What muscle has the origin: Upper two thirds of lateral shaft of fibula , head of fibula and superior tibiofibular joint. Insertion: Plantar aspect of base of 1st metatarsal and medial cuneiform, passing deep to long plantar ligament?": [
            "PERONEUS LONGUS"
        ]
    },
    {
        "What muscle has the origin: Third quarter of anterior shaft of fibula. Insertion: Shaft and base of 5th metatarsal?": [
            "PERONEUS TERTIUS"
        ]
    },
    {
        "What muscle has the origin: 2, 3, 4 costotransverse bars of anterior sacrum, few fibers from superior border of greater sciatic notch. Insertion: Anterior part of medial aspect of greater trochanter of femur?": [
            "PIRIFORMIS"
        ]
    },
    {
        "What muscle has the origin: Lateral supracondylar ridge of femur above lateral head of gastrocnemius. Insertion: Tendo calcaneus (medial side, deep to gastrocnemius tendon)?": [
            "PLANTARIS"
        ]
    },
    {
        "What muscle has the origin: Skin over lower neck and upper lateral chest. Insertion: Inferior border of mandible and skin over lower face and angle of mouth?": [
            "PLATYSMA"
        ]
    },
    {
        "What muscle has the origin: Posterior shaft of tibia above soleal line and below tibial condyles. Insertion: Middle of three facets on lateral surface of lateral condyle of femur. Tendon passes into capsule of knee to posterior part of lateral meniscus?": [
            "POPLITEUS"
        ]
    },
    {
        "What muscle has the origin: Posterior aspect of cricoid cartilage. Insertion: Muscular process of arytenoid cartilage?": [
            "POSTERIOR CRICOARYTENOID"
        ]
    },
    {
        "What muscle has the origin: Nasal bone and cartilages. Insertion: Skin of medial forehead?": [
            "PROCERUS"
        ]
    },
    {
        "What muscle has the origin: Lower quarter of anteromedial shaft of ulna. Insertion: Lower quarter of anterolateral shaft of radius and some interosseous membrane?": [
            "PRONATOR QUADRATUS"
        ]
    },
    {
        "What muscle has the origin: Humeral head: medial epicondyle, medial supracondylar ridge and medial intermuscular septum. Ulnar head: medial border of coronoid process. Insertion: Just posterior to most prominent part of lateral convexity of radius?": [
            "PRONATOR TERES"
        ]
    },
    {
        "What muscle has the origin: Transverse processes of L1 to L5, bodies of T12 to L5 and intervertebral discs below bodies of T12 to L4. Insertion: Middle surface of lesser trochanter of femur?": [
            "PSOAS MAJOR"
        ]
    },
    {
        "What muscle has the origin: Bodies of T12 and L1 and intervening intervertebral disc. Insertion: Fascia over psoas major and iliacus?": [
            "PSOAS MINOR"
        ]
    },
    {
        "What muscle has the origin: Pubic crest anterior to origin of rectus abdominis. Insertion: Lower linea alba?": [
            "PYRAMIDALIS"
        ]
    },
    {
        "What muscle has the origin: Lateral border of ischial tuberosity. Insertion: Quadrate tubercle of femur and a vertical line below this to the level of lesser trocanter?": [
            "QUADRATUS FEMORIS"
        ]
    },
    {
        "What muscle has the origin: Apices of transverse processes of L1 to L4, iliolumbar ligament and posterior third of iliac crest. Insertion: Inferior border of 12th rib?": [
            "QUADRATUS LUMBORUM"
        ]
    },
    {
        "What muscle has the origin: Lateral head-tuberosity of calcaneus, medial head-medial side of calcaneus. Insertion: Lateral border long flexor tendons?": [
            "QUADRATUS PLANTAE"
        ]
    },
    {
        "What muscle has the origin: Pubic crest and pubic symphysis. Insertion: 5, 6, 7 costal cartilages, medial inferiorcostal margin and posterior aspect of xiphoid?": [
            "RECTUS ABDOMINIS"
        ]
    },
    {
        "What muscle has the origin: Lateral mass of atlas (C1). Insertion: Basilar occipital bone anterior to occipital condyle?": [
            "RECTUS CAPITUS ANTERIOR"
        ]
    },
    {
        "What muscle has the origin: Lateral mass of atlas (C1). Insertion: Jugular process of occipital bone?": [
            "RECTUS CAPITUS LATERALIS"
        ]
    },
    {
        "What muscle has the origin: Spinous process of axis (C2). Insertion: Lateral half of inferior nuchal line?": [
            "RECTUS CAPITUS POSTERIOR MAJOR"
        ]
    },
    {
        "What muscle has the origin: Posterior process of atlas (C1). Insertion: Medial half of inferior nuchal line?": [
            "RECTUS CAPITUS POSTERIOR MINOR"
        ]
    },
    {
        "What muscle has the origin: Straight head: anterior inferior iliac spine. Reflected head: ilium above acetabulum. Insertion: Quadriceps tendon to patella , via ligamentum patellae into tubercle of tibia?": [
            "RECTUS FEMORIS"
        ]
    },
    {
        "What muscle has the origin: Spines of T2 to T5 and supraspinous ligaments. Insertion: Lower half of posteromedial border of scapula, from angle to upper part of triangular area at base of scapular spine?": [
            "RHOMBOID MAJOR"
        ]
    },
    {
        "What muscle has the origin: Lower ligamentum nuchea, spines of C7 and T1. Insertion: Small area of posteromedial border of scapula at level of spine, below levator scapulae?": [
            "RHOMBOID MINOR"
        ]
    },
    {
        "What muscle has the origin: Deep fascia of face and parotid. Insertion: Modiolus and skin at angle of mouth?": [
            "RISORIUS"
        ]
    },
    {
        "What muscle has the origin: Inferior cartilage and mucosa of pharyngeal orifice of auditory tube. Insertion: Upper border of thyroid cartilage and inferior constrictor muscle fibers?": [
            "SALPINGOPHARYNGEUS"
        ]
    },
    {
        "What muscle has the origin: Immediately below anterior superior iliac spine. Insertion: Upper medial surface of shaft of tibia?": [
            "SARTORIUS"
        ]
    },
    {
        "What muscle has the origin: Anterior tubercles of transverse processes of C3 to C6. Insertion: Scalene tubercle on superior aspect of 1st rib?": [
            "SCALENUS ANTERIOR"
        ]
    },
    {
        "What muscle has the origin: Posterior tubercles of transverse processes of C2 to C7. Insertion: Superior aspect of neck of 1st rib?": [
            "SCALENUS MEDIUS"
        ]
    },
    {
       "What muscle has the origin: Anterior tubercle of transverse process of C7. Insertion: Suprapleural membrane (Sibson's fascia)?": [
            "SCALENUS MINIMUS"
        ]
    },
    {
        "What muscle has the origin: Posterior tubercles of transverse processes C4 to C6. Insertion: Post/lateral surface of 2nd rib?": [
            "SCALENUS POSTERIOR"
        ]
    },
    {
        "What muscle has the origin: Upper outer quadrant of posterior surface of ischial tuberosity. Insertion: Medial condyle of tibia below articular margin, fascia over popliteus and oblique popliteal ligament?": [
            "SEMIMEMBRANOSUS"
        ]
    },
    {
        "What muscle has the origin: Upper inner quadrant of posterior surface of ischial tuberosity. Insertion: Upper medial shaft of tibia below gracilis?": [
            "SEMITENDINOSUS"
        ]
    },
    {
        "What muscle has the origin: Upper eight ribs and anterior intercostal membranes from midclavicular line. Lower four interdigitating with external oblique. Insertion: Inner medial border scapula. 1 and 2: upper angle; 3 and 4: length of costal surface ; 5 to 8: inferior angle?": [
            "SERRATUS ANTERIOR"
        ]
    },
    {
        "What muscle has the origin: Spinous processes and supraspinous ligaments of T11 to L2. Insertion: Posterior aspect of ribs 9-12?": [
            "SERRATUS POSTERIOR INFERIOR"
        ]
    },
    {
        "What muscle has the origin: Spinous processes and supraspinous ligaments of C7 to T2. Insertion: Posterior aspect of ribs 2-5?": [
            "SERRATUS POSTERIOR SUPERIOR"
        ]
    },
    {
        "What muscle has the origin: Soleal line and middle third of posterior border of tibia and upper quarter of posterior shaft of fibula including neck. Insertion: Tendo calcaneus to middle of three facets on posterior surface of calcaneus?": [
            "SOLEUS"
        ]
    },
    {
        "What muscle has the origin: Circular anatomical sphincter. Insertion: Deep, superficial and subcutaneous portions?": [
            "SPHINCTER ANI"
        ]
    },
    {
        "What muscle has the origin: Circular anatomical sphincter. Insertion: Fuses with deep transverse perinei?": [
            "SPHINCTER URETHRAE"
        ]
    },
    {
        "What muscle has the origin: Lower ligament nuchae, spinous processes and supraspinous ligaments T1 to T3. Insertion: Lateral occiput between superior and inferior nuchal lines?": [
            "SPLENIUS CAPITIS"
        ]
    },
    {
        "What muscle has the origin: Spinous processes and supraspinous ligaments of T3 to T6. Insertion: Posterior tubercles of transverse processes of C1 to C3?": [
            "SPLENIUS CERVICIS"
        ]
    },
    {
        "What muscle has the origin: The pyramid (posterior wall of middle ear). Insertion: Neck of stapes?": [
            "STAPEDIUS"
        ]
    },
    {
        "What muscle has the origin: Anterior and superior manubrium and superior medial third of clavicle. Insertion: Lateral aspect of mastoid process and anterior half of superior nuchal line?": [
            "STERNOCLEIDOMASTOID"
        ]
    },
    {
        "What muscle has the origin: Superior lateral posterior aspect of manubrium. Insertion: Inferior border of body of hyoid bone?": [
            "STERNOHYOID"
        ]
    },
    {
        "What muscle has the origin: Medial posterior aspect of manubrium. Insertion: Oblique line of lamina of thyroid cartilage?": [
            "STERNOTHYROID"
        ]
    },
    {
      "What muscle has the origin: Anterior surface and apex of styloid process and upper quarter of stylohyoid ligament. Insertion: Superolateral sides of tongue?": [
            "STYLOGLOSSUS"
        ]
    },
    {
        "What muscle has the origin: Base of styloid process. Insertion: Base of greater cornu of hyoid bone?": [
            "STYLOHYOID"
        ]
    },
    {
        "What muscle has the origin: Medial aspect of styloid process. Insertion: Posterolateral border of thyroid cartilage?": [
            "STYLOPHARYNGEUS"
        ]
    },
    {
        "What muscle has the origin: Costochondral junction of 1st rib. Insertion: Subclavian groove on inferior surface of middle third of clavicle?": [
            "SUBCLAVIUS"
        ]
    },
    {
        "What muscle has the origin: Internal posterior aspects of lower six ribs. Insertion: Internal aspects of ribs two to three levels below?": [
            "SUBCOSTALIS"
        ]
    },
    {
        "What muscle has the origin: Medial two thirds of subscapular fossa. Insertion: Lesser tuberosity of humerus, upper medial lip of bicipital groove, capsule of shoulder joint?": [
            "SUBSCAPULARIS"
        ]
    },
    {
        "What muscle has the origin: Body of ischium. Insertion: Perineal body?": [
            "SUPERFICIAL TRANSVERSE PERINEI"
        ]
    },
    {
        "What muscle has the origin: Body of sphenoid above tendinous ring. Insertion: Post/superior quadrant of sclera behind equator of eyeball?": [
            "SUPERIOR OBLIQUE"
        ]
    },
    {
        "What muscle has the origin: Superior tendinous ring within orbit. Insertion: Superior sclera anterior to equator of eyeball?": [
            "SUPERIOR RECTUS"
        ]
    },
    {
        "What muscle has the origin: Deep part (horizontal):supinator crest and fossa of ulna. Superficial part (downwards): lateral epicondyle and lateral ligament of elbow and annular ligament. Insertion: Neck and shaft of radius, between anterior and posterior oblique lines?": [
            "SUPINATOR"
        ]
    },
    {
        "What muscle has the origin: Medial three quarters of supraspinous fossa of scapula, upper surface of spine (bipennate). Insertion: Superior facet on greater tuberosity of humerus and capsule of shoulder joint?": [
            "SUPRASPINATUS"
        ]
    },
    {
        "What muscle has the origin: Temporal fossa between inferior temporal line and infratemporal crest). Insertion: Medial and anterior aspect of coronoid process of mandible?": [
            "TEMPORALIS"
        ]
    },
    {
        "What muscle has the origin: Aponeurosis above auricularis. Insertion: Galeal aponeurosis?": [
            "TEMPOROPARIETALIS"
        ]
    },
    {
        "What muscle has the origin: Outer surface of anterior iliac crest between tubercle of the iliac crest and anterior superior iliac spine. Insertion: Iliotibial tract (anterior surface of lateral condyle of tibia)?": [
            "TENSOR FASCIA LATA"
        ]
    },
    {
        "What muscle has the origin: Cartilaginous and bony margins of auditory tube. Insertion: Handle of malleus (via processus trochleariformis)?": [
            "TENSOR TYMPANI"
        ]
    },
    {
        "What muscle has the origin: Scaphoid fossa and medial aspect of spine of sphenoid bone. Insertion: Palatine aponeurosis (via pulley of pterygoid hamulus)?": [
            "TENSOR VELI PALATINI"
        ]
    },
    {
        "What muscle has the origin: Oval area (lower third) of lateral side of inferior angle of scapula below teres minor. Insertion: Medial lip of bicipital groove of humerus?": [
            "TERES MAJOR"
        ]
    },
    {
        "What muscle has the origin: Middle third lateral border of scapula above teres major. Insertion: Inferior facet of greater tuberosity of humerus (below infraspinatus) and capsule of shoulder joint?": [
            "TERES MINOR"
        ]
    },
    {
        "What muscle has the origin: Lower posterior surface of angle between laminae of thyroid cartilage. Insertion: Vocal process of arytenoid cartilage?": [
            "THYRO-ARYTENOID & VOCALIS"
        ]
    },
    {
        "What muscle has the origin: Lower posterior surface of thyroid cartilage. Insertion: Lateral border of epiglottis?": [
            "THYRO-EPIGLOTTICUS & VOCALIS"
        ]
    },
    {
        "What muscle has the origin: Oblique line of lamina of thyroid cartilage. Insertion: Inferior border of body of hyoid bone?": [
            "THYROHYOID"
        ]
    },
    {
        "What muscle has the origin: Upper half of lateral shaft of tibia and interosseous membrane. Insertion: Inferomedial aspect of medial cuneiform and base of 1st metatarsal?": [
            "TIBIALIS ANTERIOR"
        ]
    },
    {
        "What muscle has the origin: Upper half of posterior shaft of tibia and upper half of fibula between medial nerve crest and interosseous border, and interosseous membrane. Insertion: Tuberosity of navicular bone and all tarsal bones (except talus) and spring ligament?": [
            "TIBIALIS POSTERIOR"
        ]
    },
    {
        "What muscle has the origin: Posterior surface and muscular process of arytenoid cartilage. Insertion: Corresponding surfaces of opposite cartilage?": [
            "TRANSVERSE ARYTENOID"
        ]
    },
    {
        "What muscle has the origin: Laminae of vertebra. Insertion: Spinous processes two to three levels above?": [
            "TRANSVERSOSPINALIS-MULTIFIDUS"
        ]
    },
    {
        "What muscle has the origin: Transverse processes. Insertion: Spinous processes one above?": [
            "TRANSVERSOSPINALIS-ROTATORES"
        ]
    },
    {
        "What muscle has the origin: Transverse processes. Insertion: Spinous processes above and occipital bone?": [
            "TRANSVERSOSPINALIS-SEMISPINALES"
        ]
    },
    {
        "What muscle has the origin: Costal margin, lumbar fascia, anterior two thirds of iliac crest and lateral half of inguinal ligament. Insertion: Aponeurosis of posterior and anterior rectus sheath and conjoint tendon to pubic crest and pectineal line?": [
            "TRANSVERSUS ABDOMINIS"
        ]
    },
    {
        "What muscle has the origin: Lower third of inner aspect of sternum and lower three costosternal junctions. Insertion: Second to sixth costal cartilages?": [
            "TRANSVERSUS THORACIS"
        ]
    },
    {
        "What muscle has the origin: Medial third superior nuchal line, ligament nuchae, spinous processes and supraspinous ligaments to T12. Insertion: Upper fibers to lateral third of posterior border of clavicle; lower to medial acromion and superior lip of spine of scapula to deltoid tubercle?": [
            "TRAPEZIUS"
        ]
    },
    {
        "What muscle has the origin: Long head: infraglenoid tubercle of scapula. lateral head: upper half posterior humerus (linear origin). medial head: lies deep on lower half posterior humerus inferomedial to spiral groove and both intermuscular septa. Insertion: Posterior part of upper surface of olecranon process of ulna and posterior capsule?": [
            "TRICEPS"
        ]
    },
    {
        "What muscle has the origin: Anterior and lateral shaft of femur. Insertion: Quadriceps tendon to patella, via ligamentum patellae into tubercle of tibia?": [
            "VASTUS INTERMEDIALIS"
        ]
    },
    {
        "What muscle has the origin: Upper intertrochanteric line, base of greater trochanter, lateral linea aspera, lateral supracondylar ridge and lateral intermuscular septum. Insertion: Lateral quadriceps tendon to patella, via ligamentum patellae into tubercle of tibia?": [
            "VASTUS LATERALIS"
        ]
    },
    {
        "What muscle has the origin: Lower intertrochanteric line, spiral line, medial linea aspera and medial intermuscular septum. Insertion: Medial quadriceps tendon to patella and directly into medial patella, via ligamentum patellae into tubercle of tibia?": [
            "VASTUS MEDIALIS"
        ]
    },
    {
        "What muscle has the origin: Anterior surface of zygomatic bone. Insertion: Modiolus at angle of mouth?": [
            "ZYGOMATICUS MAJOR"
        ]
    },
    {
        "What muscle has the origin: Lateral infra-orbital margin. Insertion: Skin and muscle of upper lip?": [
            "ZYGOMATICUS MINOR"
        ]
    }
];


// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */

//     if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.05aecccb3-1461-48fb-a008-822ddrt6b516") {
//         context.fail("Invalid Application ID");
//      }

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // add any session init logic here
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId
        + ", sessionId=" + session.sessionId);

    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
        + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // handle yes/no intent after the user has been prompted
    if (session.attributes && session.attributes.userPromptedToContinue) {
        delete session.attributes.userPromptedToContinue;
        if ("AMAZON.NoIntent" === intentName) {
            handleFinishSessionRequest(intent, session, callback);
        } else if ("AMAZON.YesIntent" === intentName) {
            handleRepeatRequest(intent, session, callback);
        }
    }

    // dispatch custom intents to handlers here
    if ("AnswerIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AnswerOnlyIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("DontKnowIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.YesIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.NoIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.StartOverIntent" === intentName) {
        getWelcomeResponse(callback);
    } else if ("AMAZON.RepeatIntent" === intentName) {
        handleRepeatRequest(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
            handleGetHelpRequest(intent, session, callback);
    } else if ("AMAZON.StopIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else if ("AMAZON.CancelIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // Add any cleanup logic here
}

// ------- Skill specific business logic -------

var ANSWER_COUNT = 1;
var GAME_LENGTH = 5;
// Be sure to change this for your skill.
var CARD_TITLE = "Flash Cards";

function getWelcomeResponse(callback) {
    // Be sure to change this for your skill.
    var sessionAttributes = {},
        //CHANGE THIS TEXT
        speechOutput = " Hello, this is Muscle flash cards. " + "I will ask you " + GAME_LENGTH.toString()
            + " questions, try to get as many right as you can. Just say the answer. Let's begin. ",
        shouldEndSession = false,

        gameQuestions = populateGameQuestions(),
        correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT)), // Generate a random index for the correct answer, from 0 to 3
        roundAnswers = populateRoundAnswers(gameQuestions, 0, correctAnswerIndex),

        currentQuestionIndex = 0,
        spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]]),
        repromptText = spokenQuestion,

        i, j;

    for (i = 0; i < ANSWER_COUNT; i++) {
        repromptText += ""
    }
    speechOutput += repromptText;
    sessionAttributes = {
        "speechOutput": repromptText,
        "repromptText": repromptText,
        "currentQuestionIndex": currentQuestionIndex,
        "correctAnswerIndex": correctAnswerIndex + 1,
        "questions": gameQuestions,
        "score": 0,
        "correctAnswerText":
            questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function populateGameQuestions() {
    var gameQuestions = [];
    var indexList = [];
    var index = questions.length;

    if (GAME_LENGTH > index){
        throw "Invalid Game Length.";
    }

    for (var i = 0; i < questions.length; i++){
        indexList.push(i);
    }

    // Pick GAME_LENGTH random questions from the list to ask the user, make sure there are no repeats.
    for (var j = 0; j < GAME_LENGTH; j++){
        var rand = Math.floor(Math.random() * index);
        index -= 1;

        var temp = indexList[index];
        indexList[index] = indexList[rand];
        indexList[rand] = temp;
        gameQuestions.push(indexList[index]);
    }

    return gameQuestions;
}

function populateRoundAnswers(gameQuestionIndexes, correctAnswerIndex, correctAnswerTargetLocation) {
    // Get the answers for a given question, and place the correct answer at the spot marked by the
    // correctAnswerTargetLocation variable. Note that you can have as many answers as you want but
    // only ANSWER_COUNT will be selected.
    var answers = [],
        answersCopy = questions[gameQuestionIndexes[correctAnswerIndex]][Object.keys(questions[gameQuestionIndexes[correctAnswerIndex]])[0]],
        temp, i;

    var index = answersCopy.length;

    if (index < ANSWER_COUNT){
        throw "Not enough answers for question.";
    }

    // Shuffle the answers, excluding the first element.
    for (var j = 1; j < answersCopy.length; j++){
        var rand = Math.floor(Math.random() * (index - 1)) + 1;
        index -= 1;

        var temp = answersCopy[index];
        answersCopy[index] = answersCopy[rand];
        answersCopy[rand] = temp;
    }

    // Swap the correct answer into the target location
    for (i = 0; i < ANSWER_COUNT; i++) {
        answers[i] = answersCopy[i];
    }
    temp = answers[0];
    answers[0] = answers[correctAnswerTargetLocation];
    answers[correctAnswerTargetLocation] = temp;
    return answers;
}

function handleAnswerRequest(intent, session, callback) {
    var speechOutput = "";
    var sessionAttributes = {};
    var gameInProgress = session.attributes && session.attributes.questions;
    var answerSlotValid = isAnswerSlotValid(intent);
    var userGaveUp = intent.name === "DontKnowIntent";

    if (!gameInProgress) {
        // If the user responded with an answer but there is no game in progress, ask the user
        // if they want to start a new game. Set a flag to track that we've prompted the user.
        sessionAttributes.userPromptedToContinue = true;
        speechOutput = "There is no game in progress. Do you want to start a new game? ";
        callback(sessionAttributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, speechOutput, false));
    } else if (!answerSlotValid && !userGaveUp) {
        // If the user provided answer isn't a number > 0 and < ANSWER_COUNT,
        // return an error message to the user. Remember to guide the user into providing correct values.
        var reprompt = session.attributes.speechOutput;
        var speechOutput = "Sorry, your answer is not is our list. " + reprompt;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, reprompt, false));
    } else {
        var gameQuestions = session.attributes.questions,
            correctAnswerIndex = parseInt(session.attributes.correctAnswerIndex),
            currentScore = parseInt(session.attributes.score),
            currentQuestionIndex = parseInt(session.attributes.currentQuestionIndex),
            correctAnswerText = session.attributes.correctAnswerText;

        var speechOutputAnalysis = "";

        if (answerSlotValid && intent.slots.Answer.value.toUpperCase() == correctAnswerText.toUpperCase()) {
            currentScore++;
            speechOutputAnalysis = "correct. ";
        } else {
            if (!userGaveUp) {
                speechOutputAnalysis = "wrong. "
            }
            speechOutputAnalysis += "The correct answer is " + correctAnswerText + ". ";
        }
        // if currentQuestionIndex is 4, we've reached 5 questions (zero-indexed) and can exit the game session
        if (currentQuestionIndex == GAME_LENGTH - 1) {
            speechOutput = userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "You got " + currentScore.toString() + " out of "
                + GAME_LENGTH.toString() + " questions correct. Thank you for learning with Alexa!";
            callback(session.attributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, "", true));
        } else {
            currentQuestionIndex += 1;
            var spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]]);
            // Generate a random index for the correct answer, from 0 to 3
            correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT));
            var roundAnswers = populateRoundAnswers(gameQuestions, currentQuestionIndex, correctAnswerIndex),

                questionIndexForSpeech = currentQuestionIndex + 1,
                repromptText =  spokenQuestion ;
            for (var i = 0; i < ANSWER_COUNT; i++) {
                repromptText +=  ""
            }
            speechOutput += userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "Your score is " + currentScore.toString() + ". " + repromptText;

            sessionAttributes = {
                "speechOutput": repromptText,
                "repromptText": repromptText,
                "currentQuestionIndex": currentQuestionIndex,
                "correctAnswerIndex": correctAnswerIndex + 1,
                "questions": gameQuestions,
                "score": currentScore,
                "correctAnswerText":
                    questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
            };
            callback(sessionAttributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, false));
        }
    }
}

function handleRepeatRequest(intent, session, callback) {
    // Repeat the previous speechOutput and repromptText from the session attributes if available
    // else start a new game session
    if (!session.attributes || !session.attributes.speechOutput) {
        getWelcomeResponse(callback);
    } else {
        callback(session.attributes,
            buildSpeechletResponseWithoutCard(session.attributes.speechOutput, session.attributes.repromptText, false));
    }
}

function handleGetHelpRequest(intent, session, callback) {
    // Set a flag to track that we're in the Help state.
    if (session.attributes) {
        session.attributes.userPromptedToContinue = true;
    } else {
        // In case user invokes and asks for help simultaneously.
        session.attributes = { userPromptedToContinue: true };
    }

    // Do not edit the help dialogue. This has been created by the Alexa team to demonstrate best practices.

    var speechOutput = "To start a new game at any time, say, start new game. "
        + "To repeat the last element, say, repeat. "
        + "Would you like to keep playing?",
        repromptText = "Try to get the right answer. "
        + "Would you like to keep playing?";
        var shouldEndSession = false;
    callback(session.attributes,
        buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a custom closing statment when the user wants to quit the game
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Thanks for playing Flash Cards!", "", true));
}

function isAnswerSlotValid(intent) {
    var answerSlotFilled = intent.slots && intent.slots.Answer && intent.slots.Answer.value;
    var answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.Answer.value));
    return 1;
}

// ------- Helper functions to build responses -------


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}
