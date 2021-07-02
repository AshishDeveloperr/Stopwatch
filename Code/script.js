// Some songs may be faulty due to broken links. Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: {},
// config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  songs: [
    {
      name: "Galat Fehmi",
      singer: "Asim Azhar and Zenab Fatimah Sultan",
      path: "../Songs/Galat Fehmi.mp3",
      image: "../Images/galat.jpeg"
    },
    {
      name: "Baarish Ban Jaana",
      singer: "Payal Dev & Stebin Ben",
      path: "../Songs/Baarish Ban Jaana.mp3",
      image:
        "../Images/barish ban jana.jpeg"
    },
    {
      name: "O Khuda ",
      singer: "Amaal Malik & Palak Muchhal",
      path:
        "../Songs/O Khuda .mp3",
      image: "../Images/O_khuda.jpg"
    },
    {
      name: "Main Jis Din Bhula Du ",
      singer: "Jubin Nautiyal",
      path: "../Songs/Mainn Jis Din Bhula Du .mp3",
      image:
        " ../Images/mai jis din12.jpeg"
    },
    {
      name: "Do You Know",
      singer: "Diljit Dosanjh",
      path: "../Songs/Do You Know .mp3",
      image:
        "../Images/Do you know.jpeg"
    },
    {
      name: "Enna Sona",
      singer: "Arijit Singh",
      path:
        "../Songs/Enna Sona .mp3",
      image:
        "../Images/ok jaanu.jpeg"
    },
    {
      name: "Bedardi Se Pyaar Ka",
      singer: "Jubin Nautiyal",
      path: "../Songs/Bedardi Se Pyaar Ka LYRICS  Jubin Nautiyal.mp3",
      image:
        "../Images/be dardi.jpg"
    },
    
    {
      name: "Baatein Ye Kabhi Na",
      singer: "Arijit Singh",
      path:
        "../Songs/Baatein Ye Kabhi Na KhamoshiyanArijit Singh.mp3",
      image:
        "../Images/baatein ye kabhi na.jpg"
    },
    
    {
      name: "Baarish Ki Jaay image",
      singer: "B Paraak",
      path:
        "../Songs/Baarish Ki Jaaye.mp3",
      image:
        "../Images/Baarish Ki Jaay image.jpeg"
    },
    
    {
      name: "pal",
      singer: "Arijit Singh",
      path:
        "../Songs/Pal  Arijit Singh .mp3",
      image:
        "../Images/pal.jpeg"
    },
    
    {
      name: "BANJARA ",
      singer: "Mohd. Irfan",
      path:
        "../Songs/BANJARA .mp3",
      image:
        "../Images/banjaara.jpeg"
    },
    
    {
      name: "Backbone",
      singer: "Harrdy Sandhu",
      path:
        "../Songs/Harrdy Sandhu  Backbone .mp3",
      image:
        "../Images/Backbone.jpg"
    },
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
    
    // localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
                        <div class="song ${
                          index === this.currentIndex ? "active" : ""
                        }" data-index="${index}">
                            <div class="thumb"
                                style="background-image: url('${song.image}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `;
    });
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      }
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

        // Handle CD spins / stops
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity
    });
    cdThumbAnimate.pause();

      // Handles CD enlargement / reduction
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    
    // Handle when click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    
    // When the song is played
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    
    // When the song is pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

        // When the song progress changes
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    
    // Handling when seek
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    
    // When next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    
    // When prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    
    // Handling on / off random song
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

        // Single-parallel repeat processing
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    
    // Handle next song when audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    
    // Listen to playlist clicks
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        
        // Handle when clicking on the song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

              // Handle when clicking on the song option
        if (e.target.closest(".option")) {
        }
      }
    };
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }, 300);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    
    // Assign configuration from config to application
    this.loadConfig();

        // Defines properties for the object
    this.defineProperties();

    
    // Listening / handling events (DOM events)
    this.handleEvents();

    // Load the first song information into the UI when running the app
    this.loadCurrentSong();

    // Render playlist
    this.render();

    // Display the initial state of the repeat & random button
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  }
};

app.start();
