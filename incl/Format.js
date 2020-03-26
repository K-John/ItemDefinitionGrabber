var Format = (function() {

	return {
		fluxious: function(item) {

			var string = ("Id: " + item.id +
				"\nName: " + item.name +
				"\nExamine: " + item.examine + 
				"\nPrice: " + item.cost +
				"\nNoted: " + item.noted +
				"\nStackable: " + item.stackable +
				"\nUntradeable osrs eco: " + item.untradeable +
				"\nDrop destroy: " + item.destroy +
				"\nMask: " + item.mask +
				"\nHelm: " + item.helm +
				"\nFull body: " + item.fullbody +
				"\nF2p: " + item.f2p +
				"\nStab attack bonus: " + item.equipment.attack_stab + 
				"\nSlash attack bonus: " + item.equipment.attack_slash + 
				"\nCrush attack bonus: " + item.equipment.attack_crush + 
				"\nMagic attack bonus: " + item.equipment.attack_magic + 
				"\nRanged attack bonus: " + item.equipment.attack_ranged + 
				"\nStab defence bonus: " + item.equipment.defence_stab + 
				"\nSlash defence bonus: " + item.equipment.defence_slash + 
				"\nCrush defence bonus: " + item.equipment.defence_crush + 
				"\nMagic defence bonus: " + item.equipment.defence_magic + 
				"\nRanged defence bonus: " + item.equipment.defence_ranged + 
				"\nStrength bonus: " + item.equipment.melee_strength + 
				"\nPrayer bonus: " + item.equipment.prayer + "\n\n\n");

			return string;
		}
	}
})();