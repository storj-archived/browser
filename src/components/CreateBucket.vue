<style scoped>
.create-container {
    width: 625px;
    max-width: 625px;
    background: #fff;
    border-radius: 10px;
    padding: 50px 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Inter, sans-serif;
    font-style: normal;
    position: relative;
}

.title {
    font-weight: bold;
    font-size: 22px;
    line-height: 27px;
    color: #000000;
    margin-bottom: 18px;
}

.sub-title {
    font-weight: normal;
    font-size: 18px;
    line-height: 30px;
    text-align: center;
    letter-spacing: -0.100741px;
    color: rgba(37, 37, 37, 0.7);
    margin-bottom: 22px;
}

.label {
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
    color: #354049;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
}

.button {
    background: #0068DC;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    line-height: 23px;
    color: #fff;
    width: 100%;
    height: 48px;
    border: none;
}

.input {
    border: 1px solid rgba(56, 75, 101, 0.4);
    border-radius: 6px;
    padding: 15px 20px;
    margin-top: 10px;
    width: 100%;
}

.close-icon {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
}
</style>

<template>
    <div class="create-container">
        <h1 class="title">Create Bucket</h1>
        <p class="sub-title">Buckets are simply containers that store objects and their metadata within a project.</p>
        <label class="label" for="bucket-name-input">
            Bucket Name (only lowercase letters)
            <input class="input" id="bucket-name-input" type="text" @change="onNameChange" placeholder="Enter bucket name">
        </label>
        <button class="button" @click="onCreateClick">Create Bucket</button>
        <svg class="close-icon" v-if="isModal" @click="closeModal" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 1L1 13M1 1L13 13" stroke="#1B2533" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </div>
</template>

<script>
export default {
    props: [
        'isModal',
    ],
    data: () => ({
        bucketName: '',
    }),
    methods: {
        async onCreateClick() {
            try {
                await this.$store.dispatch('buckets/create', this.bucketName);

                if (this.isModal) {
                    this.closeModal()
                }
            } catch (e) {
                console.log(e.message);
            }
        },
        onNameChange(event) {
            this.bucketName = event.target.value.toLowerCase();
        },
        closeModal() {
            this.$emit('close');
        }
    }
}
</script>
