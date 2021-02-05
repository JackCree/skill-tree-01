## Basic Skill Tree with Vue.js and Json

This is the first project where I'm testing datavisualization with Vue.js. The idea is to visualize the progress of knowledge learned and acquired in web development. For inspiration, I relied on [Kakadodo](https://kakadodo.github.io/theF2EChallange/)'s work with its realization.

### In HTML : 

Add the elements to make appear according to the progression 
```markdown
Exemple

# implementation of the data in the html section
<li class="list" v-for="(branch,i) in skillDatas[0].branch" :class="{active: branch.active, completed: branch.recommendComplete}">
	              			<a href="#" v-on:click.prevent="focusList(branch)"><i class="material-icons">{{branch.iconName}}</i></a>
	              			<small class="recommend"><i class="material-icons">settings</i><span>{{currentComplete(branch.recommend)}}/{{branch.recommend!==null? branch.recommend.length:"0"}}</span></small>
	              			<small class="optional"><i class="material-icons">filter_tilt_shift</i><span>{{currentComplete(branch.optional)}}/{{branch.optional!==null? branch.optional.length:"0"}}</span></small>
	              		</li>
```

For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).

### Organisation of the data file 

The file works with 4 levels (Basics, CSS, Javascript and Managers). Inside, branchs are created for each theme of skills to learn. For each skill, a checklist of elements to validate are integrated with 2 interests: recommandation and optional
```markdown
{
    "name": "BASICS",
    "branch": [{
      "name": "BASIC SKILLS",
      "iconName": "category",
      "recommend": [{
        "name": "Learn HTML",
        "complete": false
      }, {
        "name": "Basics of CSS",
        "complete": false
      }, {
        "name": "Basics of JavaScript",
        "complete": false
      }],
      "optional": null,
      "active": true,
      "recommendComplete": false
    }, {
      "name": "BASIC TOOLS",
      "iconName": "build",
      "recommend": [{
        "name": "Git - Version Control",
        "complete": false
      }, {
        "name": "Basic Terminal Usage",
        "complete": false
      }, {
        "name": "Text Editor",
        "complete": false
      }, {
        "name": "A Heart of Reserching",
        "complete": false
      }],
      "optional": null,
      "active": false,
      "recommendComplete": false
    }],
    "levelComplete": false
  }
```

### Javascript and Vue.Js
integrate methods using the Vue.js to mark the progress in the path 
```markdown
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
    }
```

