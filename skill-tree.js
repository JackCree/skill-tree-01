"use strict";
$(function() {
    new Vue({
        el: "#app",
        data: {
            skillDatas: [],
            ranks: [{
                name: "NOOB",
                picUrl: "./img/img-ship-noob.png",
                sentence: 'Bienvenue à bord ! Votre mission: <span class="highline">Collecter les ressources et apprendre les compétences pour améliorer le vaisseau.</span><br>Bonne chance, capitaine !'
            }, {
                name: "DEBUTANT",
                picUrl: "./img//img-ship-beginner.png",
                sentence: '<b>Félicitations !</b> Vous êtes devenu un <span class="highline">“Front-end Débutant”</span>. Continuez à chercher les ressources pour passer au niveau supérieur.'
            }, {
                name: "DEVELOPPEUR",
                picUrl: "./img/img-ship-developer.png",
                sentence: '<b>Vous progressez bien !</b> Maintenant, vous êtes un <span class="highline">“Front-end Développeur”</span>. Le programme de mise à niveau est presque terminé. <br>Niveau suivant : Front End Master'
            }, {
                name: "MASTER",
                picUrl: "./img/img-ship-master.png",
                sentence: '<b>Excellent!</b> Vous êtes un <span class="highline">“Front-end Master”</span> maintenant. Mais une nouvelle galarie a émergé dans le système.<br>Capitaine, faites votre choix'
            }],
            currentRank: 0,
            currentBranch: {}
        },
        methods: {
            /*Return true when the element in the checklist is completed
            0: false
            1: true
            */
            currentComplete: function(e) {
                return null == e ? 0 : e.filter(function(e) {
                    return 1 == e.complete
                }).length
            },
            //Make appear all the elements in the list to validate the skills
            focusList: function(e) {
                this.skillDatas.forEach(function(e) {
                    e.branch.forEach(function(e) {
                        e.active = !1
                    })
                }),
                e.active = !0,
                this.currentBranch = e
            },
            //Check if all elements in the checklist are completed
            toggleListComplete: function(e) {
                e.complete = !e.complete,
                this.checkBranchComplete()
            },
            //Check if all elements in the branch are completed
            checkBranchComplete: function() {
                if (null != this.currentBranch.recommend)
                    return this.currentBranch.recommendComplete = this.currentBranch.recommend.every(function(e) {
                        return 1 == e.complete
                    }),
                    this.currentBranch.recommendComplete && this.checkLevelComplete()
            },
            //check if all brach on levels are completed
            checkLevelComplete: function() {
                var n = 0;
                this.skillDatas.forEach(function(e) {
                    e.levelComplete = e.branch.every(function(e) {
                        return 1 == e.recommendComplete
                    }),
                    n = 1 == e.levelComplete ? ++n : n
                }),
                this.currentRank = 0 == n ? n : n - 1
            }
        },
        //Generate the skill tree with the actual data
        created: function() {
            var n = this;
            $.getJSON("https://raw.githubusercontent.com/JackCree/skill-tree-01/main/skill-tree.json", function(e) {
                n.skillDatas = e,
                n.currentBranch = n.skillDatas[0].branch[0]
            })
        }
    })
});

