<template>
  <div class="about">
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias, libero distinctio, quo quisquam repellat quod tempora harum corporis nisi nemo nulla dolorem at, odit iste autem accusantium. Ad, id! Voluptatum?</p>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima eligendi molestiae, voluptatibus ab expedita officia consequatur non, fugit doloremque vero labore? Minus possimus laudantium eum ut. Quae assumenda dolorum eaque.</p>
    <p>Hic distinctio magni laudantium eum. Rem cum deleniti quas! Odit ex soluta facere quae atque exercitationem hic non laborum sequi voluptatibus? Commodi laborum tenetur dolorum sapiente officia! Ipsum, eos minus.</p>
    <p>Tempore facilis hic veniam atque pariatur nemo, consequuntur consequatur libero ad magnam, corporis recusandae expedita dolore laboriosam quos assumenda, facere enim quis id! Adipisci veniam, iste repellendus delectus in obcaecati.</p>
    <p>Deleniti quos nisi, nemo dolores inventore omnis nesciunt enim repellendus illum recusandae impedit maiores labore. Alias voluptates officiis, fuga libero accusamus architecto veritatis porro suscipit quaerat, reprehenderit quam numquam excepturi?</p>
    <p>Perspiciatis dolorem quo minus neque, illo deserunt? Dolorem, aut unde beatae hic magnam fuga accusamus suscipit tempore temporibus doloribus excepturi labore iste exercitationem, aperiam repudiandae vero expedita obcaecati corrupti vitae.</p>
    <p>Voluptatum eligendi sunt laudantium nostrum, in illum maxime harum corporis porro corrupti. Sit magnam minus atque nemo! Praesentium nisi ratione laborum ullam blanditiis doloremque numquam ipsum. Corporis reiciendis ea fuga.</p>
    <p>Consectetur atque pariatur ex porro eum, dignissimos tenetur, beatae quas fugit velit sint dolores doloremque, cumque quos ad totam? Consequatur error blanditiis velit dolor provident fugit debitis eveniet illum perferendis.</p>
    <p>Dolorem accusantium sequi eligendi debitis libero? Facere repellat perspiciatis nihil minima. Impedit dolore commodi, est ipsa sit molestiae ab sequi, necessitatibus voluptatem quasi, enim consectetur ducimus libero facilis ipsam provident.</p>
    <p>Obcaecati incidunt praesentium impedit sit? Dolor aliquid laboriosam, alias minus dolore vel molestiae modi voluptates iure deserunt, explicabo eaque aspernatur harum sapiente, expedita a quasi adipisci inventore debitis cumque excepturi.</p>
    <p>Error est corporis doloremque, veritatis amet iure debitis commodi soluta porro neque! Voluptatum explicabo fugiat temporibus totam tempore sunt, eos, magni voluptatibus hic natus nisi sit aperiam soluta perferendis velit.</p>
  </div>
</template>
<script>
export default{
  name:'',
  data(){
    return {

    }
  },
  computed: {
    commonData(){
      return this.$store.state.commonData;
    }
  },
  methods: {
    changeParentState(){
      this.$store.commit('setCommonData',{ parent: 1 });
    }
  },
  mounted(){
    return
    function getColor(){
      const HexColor = Array.from({length:6},(v,k)=>{
        return parseInt(Math.random()*10+k)
      }).reduce((pre,cur)=>pre+cur,'')
      return '#' +(HexColor.slice(-6))
    }
    document.querySelectorAll('p').forEach(x=>{
      x.addEventListener('mouseenter',function(e){
        const color = e.target.style.color
        e.target.dataColor= color
        e.target.style.color= getColor()
      })
      x.addEventListener('mouseleave',function(e){
        const color = e.target.dataColor
        e.target.style.color= color
      })
    })
  },
}
</script>
<style lang="scss" scoped>
.about{
  padding: 20px;
  p{
    font-size: 20px;
    color: #fff;
    margin-bottom: 20px;
    padding: 10px;
    &:first-of-type{
      color: aquamarine;
    }
  }
}
</style>
